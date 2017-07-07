'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'news_source',
      'headlineSelector'
    ).then(queryInterface.addColumn(
      'news_source',
      'headlineSelectors',
      {
        type: Sequelize.ARRAY(Sequelize.STRING)
      }
    ));
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'news_source',
      'headlineSelectors'
    ).then(queryInterface.addColumn(
      'news_source',
      'headlineSelector',
      {
        type: Sequelize.STRING
      }
    ));
  }
};
