'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('news_integration', {
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      config: {
        type: DataTypes.JSON,
        allowNull: false
      },
      screenName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      newsSourceId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('news_integration');
  }
};
