'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('news_integration', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      config: {
        type: Sequelize.JSON,
        allowNull: false
      },
      screenName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      newsSourceId: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('news_integration');
  }
};
