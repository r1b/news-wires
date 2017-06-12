'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'news_source',
      'urlRegexps',
      {
        type: Sequelize.ARRAY(Sequelize.STRING)
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('news_source', 'urlRegexps');
  }
};
