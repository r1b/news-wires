const path = require('path');
const URL = require('url');
const cheerio = require('cheerio');
const FeedParser = require('feedparser');
const LRU = require('lru-cache');
const request = require('request-promise-native');
const Twitter = require('twitter');
const config = require('news-wires-twitter');

module.exports = (sequelize, DataTypes) => {
  const NewsIntegration = sequelize.define('NewsIntegration', {
    type: {
      comment: 'The type of integration - one of rss | web',
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['rss', 'web']]
      }
    },
    config: {
      comment: 'A configuration object for the given integration type',
      type: DataTypes.JSON,
      allowNull: false
    },
    screenName: {
      comment: 'The twitter screen name of this integration account',
      type: DataTypes.STRING,
      allowNull: false
    },
    newsSourceId: {
      comment: "FK to NewsSource",
      type: DataTypes.INTEGER,
      allowNull: false,
      model: 'news_source',
      key: 'id'
    }
  },
  {
    freezeTableName: true,
    tableName: 'news_integration'
  });

  NewsIntegration.associate = function (models) {
    models.NewsIntegration.belongsTo(models.NewsSource, {foreignKey: 'newsSourceId'});
  };

  NewsIntegration.prototype.integrate = function () {
    const NewsItem = sequelize.models.NewsItem;
    NewsItem.findAll({
      include: [sequelize.models.NewsSource],
      limit: this.config.maxCacheSize,
      where: {
        '$NewsSource.id$': this.newsSourceId
      }
    }).then((newsItems) => {
      const cache = LRU(this.config.maxCacheSize);
      cache.load(newsItems.map((newsItem) => { return { k: newsItem.url, v: true}; }));
      this[this.type](cache);
    });
  }

  NewsIntegration.prototype.rss = function (cache) {
    const feedparser = new FeedParser();
    const req = request(this.config.url);
    const twitterClient = new Twitter(config(this.screenName));

    req.on('error', (error) => {
      console.error(error);
    });

    req.on('response', function (response) {
      if (response.statusCode !== 200) {
        this.emit('error', new Error(`Bad status code: ${response.statusCode}`));
      }
      else {
        this.pipe(feedparser);
      }
    });

    feedparser.on('error', (error) => {
      console.error(error);
    });

    feedparser.on('data', function (item) {
      if (!cache.get(item.link)) {
        console.info(`RSS MISS ${item.link}`);
        twitterClient.post('statuses/update', {
          status: `${item.title}\n${item.link}`
        }, (error, tweet, response) => {
          if (error) {
            this.emit('error', error);
          }
          else {
            cache.set(item.link, true);
            console.log(`{${tweet.user.screen_name}} ${tweet.text}`);
          }
        });
      }
      else {
        console.info(`RSS HIT ${item.link}`);
      }
    });
  };

  NewsIntegration.prototype.web = function (cache) {
    const twitterClient = new Twitter(config(this.screenName));
    function web () {
      request({
        uri: this.config.url,
        resolveWithFullResponse: true,
        maxRedirects: 30
      }).then((response) => {
        if (response.statusCode !== 200) {
          return Promise.reject(new Error(`Bad status code: ${response.statusCode}`));
        }
        else {
          const baseUrl = URL.parse(this.config.url);
          const $ = cheerio.load(response.body);

          $(this.config.linkSelector).each((_, element) => {
            let url = URL.parse($(element).attr('href'));

            if (!url.origin) {
              url = path.join(baseUrl.hostname, url.path);
            }
            else {
              url = url.toString();
            }

            if (!cache.get(url)) {
              console.info(`WEB MISS ${url}`);
              twitterClient.post('statuses/update', {
                status: `${$(element).text()} ${url}`
              }, (error, tweet, response) => {
                if (error) {
                  console.error(error);
                }
                else {
                  cache.set(url, true);
                  console.log(`{${tweet.user.screen_name}} ${tweet.text}`);
                }
              });
            }
            else {
              console.info(`WEB HIT ${url}`);
            }
          });
        }
      }).catch((error) => {
        console.error(error);
      });

    }
    web.call(this);
    setInterval(web.bind(this), 300000);
  };

  return NewsIntegration;
};
