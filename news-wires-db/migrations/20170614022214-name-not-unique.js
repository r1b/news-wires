'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeConstraint('news_source', 'news_source_name_key');
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addConstraint('news_source', ['name'], {
        type: 'unique',
        name: 'news_source_name_key'
    });
  }
};
