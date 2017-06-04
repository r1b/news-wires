'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('news_source', [
      {
        name: 'AP',
        twitterUserId: 51241574,
        urlRegexes: ['apnews\\.com'],
        headlineSelector: '.topTitle'
      },
      {
        name: 'REUTERS',
        twitterUserId: 1652541,
        urlRegexes: ['reuters\\.com'],
        headlineSelector: '.article-headline'
      },
      {
        name: 'AFP',
        twitterUserId: 380648579,
        urlRegexes: ['yahoo\\.com'],
        headlineSelector: '#SideTop-0-HeadComponentTitle h1'
      }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('news_source', null, {});
  }
};
