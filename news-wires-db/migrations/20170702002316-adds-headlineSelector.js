'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'news_source',
      'headlineSelector',
      {
        type: Sequelize.STRING
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('news_source', 'headlineSelector');
  }
};
