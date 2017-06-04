'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('news_source', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isUppercase: true
        }
      },
      twitterUserId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      urlRegexes: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false
      },
      headlineSelector: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    }).then(queryInterface.createTable('news_item', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isUrl: true
        }
      },
      headline: {
        type: Sequelize.STRING,
        allowNull: false
      },
      newsSourceId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'news_source',
          key: 'id'
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    }));
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('news_item')
            .then(queryInterface.dropTable('news_source'));
  }
};
