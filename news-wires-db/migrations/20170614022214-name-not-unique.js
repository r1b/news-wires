'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'news_source',
      'name',
      {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        validate: {
          isUppercase: true
        }
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'news_source',
      'name',
      {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isUppercase: true
        }
      }
    );
  }
};
