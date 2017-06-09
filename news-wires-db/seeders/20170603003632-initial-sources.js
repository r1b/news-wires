'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('news_source', [
      {
        name: 'AP',
        twitterUserId: 51241574,
        urlToHeadlineSelectorMap: JSON.stringify({
          'apnews\\.com/[0-9a-f]{32}': ['.topTitle']
        })
      },
      {
        name: 'REUTERS',
        twitterUserId: 1652541,
        urlToHeadlineSelectorMap: JSON.stringify({
          'reuters\\.com/article': ['.article-headline']
        })
      },
      {
        name: 'AFP',
        twitterUserId: 380648579,
        urlToHeadlineSelectorMap: JSON.stringify({
          'www\\.yahoo\\.com/news|sg\\.news\\.yahoo\\.com': [
            '#SideTop-0-HeadComponentTitle h1'
          ],
          'au\\.news\\.yahoo\\.com': ['.page-header-title']
        })
      },
      {
        name: 'UPI',
        twitterUserId: 16666806,
        urlToHeadlineSelectorMap: JSON.stringify({
          'upi\\.com': ['.st_headline'],
        })
      },
      {
        name: 'BLOOMBERG',
        twitterUserId: 34713362,
        urlToHeadlineSelectorMap: JSON.stringify({
          'bloomberg\\.com/news/articles': [
            '.lede-text-only__hed .lede-text-only__highlight',
            '.lede-large-content__hed .lede-large-content__highlight'
          ]
        })
      }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('news_source', null, {});
  }
};
