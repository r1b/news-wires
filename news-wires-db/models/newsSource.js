const cheerio = require('cheerio');
const request = require('request-promise-native');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('NewsSource', {
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
      type: DataTypes.INTEGER,
      allowNull: false
    },
    urlRegexes: {
      comment: 'A set of regular expressions to identify a valid URL for this source',
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    headlineSelector: {
      comment: "A CSS selector that will retrieve the element containing the headline for any of this source's articles",
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'news_source',
    classMethods: {
      associate: function (models) {
        models.NewsSource.hasMany(models.NewsItem, {foreignKey: 'newsSourceId'});
      },
    },
    instanceMethods: {
      scrape: function (url) {
        const that = this;
        const NewsItem = sequelize.models.NewsItem;
        return (
          request({'uri': url, 'resolveWithFullResponse': true})
            .then(function (response) {
              if (response.statusCode !== 200) {
                return Promise.reject(
                  new Error(`Got ${response.statusCode} when fetching ${response.request.uri.href}`)
                )
              }
              else if (
                !that.urlRegexes.some((re) => new RegExp(re).test(response.request.uri.href))
              ) {
                return Promise.reject(
                  new Error(`${response.request.uri.href} did not match any of ${that.urlRegexes}`)
                )
              }
              else {
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
            })
            .catch((error) => Promise.reject(error)) // XXX do i need this?
        );
      },
      parseHeadline: function ($) {
        return $(this.headlineSelector).text();
      }
    }
  });
};
