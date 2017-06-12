'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('news_source', 'urlToHeadlineSelectorMap');
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'news_source',
      'urlToHeadlineSelectorMap',
      {
        type: Sequelize.JSON
      }
    );
  }
};
