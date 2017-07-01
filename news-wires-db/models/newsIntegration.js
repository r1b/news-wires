const cheerio = require('cheerio');
const FeedParser = require('feedparser');
const LRU = require('lru-cache');
const request = require('request');
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

  NewsIntegration.prototype.rss = function () {
    const feedParser = new FeedParser();
    const req = request(this.config.url);
    const twitterClient = new Twitter(config(this.screenName));

    req.on('error', (error) => {
      console.error(error);
    });

    req.on('response', (response) => {
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

    feedparser.on('data', (item) => {
      twitterClient.post('statuses/update', {
        status: `${item.title}\n${item.link}`
      }, (error, tweet, response) => {
        if (error) {
          this.emit('error', error);
        }
        else {
          console.log(tweet);
        }
      });
    });
  };

  NewsIntegration.prototype.web = function () {
    const twitterClient = new Twitter(config(this.screenName));
    const cache = LRU(this.config.maxCacheSize);

    setInterval(() => {
      const req = request(this.config.url);

      req.on('error', (error) => {
        console.error(error);
      });

      req.on('response', (response) => {
        if (response.statusCode !== 200) {
          this.emit('error', new Error(`Bad status code: ${response.statusCode}`));
        }
        else {
          const $ = cheerio.load(response.body);
          $(this.config.linkSelector).each((_, element) => {
            if (!this.cache.get(element.href)) {
              console.info(`MISS ${element.href}`);
              twitterClient.post('statuses/update', {
                status: `${element.text()} ${element.href}`
              }, (error, tweet, response) => {
                if (error) {
                  this.emit('error', error);
                }
                else {
                  console.log(tweet);
                }
              });
            }
            else {
              console.info(`HIT ${element.href}`);
            }
          });
        }
      });
    }, 300000);
  };

  return NewsIntegration;
};
