const models = require('news-wires-db')

module.exports = function () {
  return (
    models.NewsIntegration
      .findAll()
      .then((newsIntegrations) => {
        newsIntegrations.forEach((newsIntegration) => {
          newsIntegration.integrate();
        });
      })
      .catch((error) => {
        console.error(error);
      });
  );
};
