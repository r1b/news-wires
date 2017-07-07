'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'news_source',
      'headlineSelector',
      {
        type: DataTypes.ARRAY(DataTypes.STRING)
      }
    ).then(queryInterface.renameColumn(
      'news_source',
      'headlineSelector',
      'headlineSelectors'
    ));
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'news_source',
      'headlineSelectors',
      {
        type: DataTypes.STRING
      }
    ).then(queryInterface.renameColumn(
      'news_source',
      'headlineSelectors',
      'headlineSelector'
    ));
  }
};
