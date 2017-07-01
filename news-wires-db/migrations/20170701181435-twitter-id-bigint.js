'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'news_source',
      'twitterUserId',
      {
        type: Sequelize.BIGINT,
        allowNull: false
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'news_source',
      'twitterUserId',
      {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    );
  }
};
