'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('news_source', [
      {
        name: 'AP',
        twitterUserId: 51241574,
        urlRegexps: [
          'apnews\\.com/[0-9a-f]{32}'
        ]
      },
      {
        name: 'REUTERS',
        twitterUserId: 1652541,
        urlRegexps: [
          'reuters\\.com/article'
        ]
      },
      {
        name: 'AFP',
        twitterUserId: 380648579,
        urlRegexps: [
          'www\\.yahoo\\.com/news',
          'sg\\.news\\.yahoo\\.com',
          'au\\.news\\.yahoo\\.com'
        ]
      },
      {
        name: 'UPI',
        twitterUserId: 16666806,
        urlRegexps: [
          'upi\\.com'
        ]
      },
      {
        name: 'BLOOMBERG',
        twitterUserId: 34713362,
        urlRegexps: [
          'bloomberg\\.com/news/articles'
        ]
      }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('news_source', null, {});
  }
};
