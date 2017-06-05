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
    urlToHeadlineSelectorMap: {
      comment: 'A mapping from a URL regexp to a CSS selector that can parse its headline',
      type: DataTypes.JSON,
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
                let urlRegexps = Object.keys(that.urlToHeadlineSelectorMap);
                for (let urlRegexp of urlRegexps) {
                  if (new RegExp(urlRegexp).test(response.request.uri.href)) {
                    return NewsItem.create({
                      url: response.request.uri.href.split('?')[0], // die analytics xXx KILL
                      headline: that.parseHeadline(
                        cheerio.load(response.body),
                        that.urlToHeadlineSelectorMap[urlRegexp]
                      ),
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
                  new Error(`${response.request.uri.href} did not match any of ${urlRegexps}`)
                )
              }
            })
            .catch((error) => Promise.reject(error)) // XXX do i need this?
        );
      },
      parseHeadline: function ($, selectors) {
        let headline;
        for (let selector of selectors) {
          headline = $(selector).text();
          if (headline) { return headline }
        }
        console.warn(`Could not parse headline with selectors ${selectors}`);
        return headline;
      }
    }
  });
};
