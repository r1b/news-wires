const cheerio = require('cheerio');
const request = require('request-promise-native');

module.exports = (sequelize, DataTypes) => {
  const NewsSource = sequelize.define('NewsSource', {
    name: {
      comment: 'The name of the wire service in UPPERCASE',
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isUppercase: true
      }
    },
    twitterUserId: {
      comment: 'The id of the twitter account associated with this source',
      type: DataTypes.BIGINT,
      allowNull: false
    },
    urlRegexps: {
      comment: 'A list of regexps that determine which URLs to scrape',
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false
    },
    locale: {
      comment: '(OPTIONAL) The language and (optionally) country of news from this source',
      type: DataTypes.STRING
    },
    headlineSelector: {
      comment: '(OPTIONAL) CSS selector to parse headlines from this source',
      type: DataTypes.STRING
    }
  }, {
    freezeTableName: true,
    tableName: 'news_source'
  });

  NewsSource.associate = function (models) {
    models.NewsSource.hasMany(models.NewsItem, {foreignKey: 'newsSourceId'});
    models.NewsSource.hasMany(models.NewsIntegration, {foreignKey: 'newsSourceId'});
  };

  NewsSource.prototype.scrape = function (url) {
    const that = this;
    const NewsItem = sequelize.models.NewsItem;
    console.info(`Fetching ${url}`);
    return (
      request({'uri': url, 'resolveWithFullResponse': true, 'maxRedirects': 30})
        .then(function (response) {
          if (response.statusCode !== 200) {
            return Promise.reject(
              new Error(`Got ${response.statusCode} when fetching ${response.request.uri.href}`)
            )
          }
          else {
            for (let urlRegexp of that.urlRegexps) {
              if (new RegExp(urlRegexp).test(response.request.uri.href)) {
                return NewsItem.create({
                  url: response.request.uri.href.split('?')[0], // die analytics xXx KILL
                  headline: that.parseHeadline(cheerio.load(response.body)),
                  newsSourceId: that.get('id')
                }, {
                  'include': [sequelize.models.NewsSource]
                }).then((newsItem) => {
                  return newsItem.getNewsSource().then((newsSource) => {
                    return [newsItem, newsSource];
                  });
                });
              }
            }
            return Promise.reject(
              new Error(`${response.request.uri.href} did not match any of ${that.urlRegexps}`)
            )
          }
        })
        .catch((error) => Promise.reject(error)) // XXX do i need this?
    );

  };

  NewsSource.prototype.parseHeadline = function ($) {
    let headline;

    if (this.headlineSelector) {
      headline = $(this.headlineSelector).text();
    }
    else {
      headline = $('meta[property="og:title"]').attr('content') || $('title').text();
    }

    [/\s+\-\s+/, /\s+\|\s+/].forEach((sepRegexp) => {
      const headlineParts = headline.split(sepRegexp);
      if (sepRegexp.test(headlineParts[headlineParts.length - 1])) {
        console.warn(`Stripping ${sepRegexp} from ${headline}`);
        headline = headline.split(sepRegexp)[0];
      }
    });
    return headline;
  };

  return NewsSource;
};
