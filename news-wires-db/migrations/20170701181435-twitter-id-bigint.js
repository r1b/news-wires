'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'news_source',
      'twitterUserId',
      {
        type: DataTypes.BIGINT,
        allowNull: false
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'news_source',
      'twitterUserId',
      {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    );
  }
};
