const models = require('news-wires-db')

module.exports = function () {
  models.NewsIntegration
    .findAll()
    .then((newsIntegrations) => {
      newsIntegrations.forEach((newsIntegration) => {
        newsIntegration[newsIntegration.type]();
      });
    })
    .catch((error) => {
      console.error(error);
    });
};
