module.exports = {
  "development": {
    "dialect": "postgres",
    "url": process.env.NEWS_WIRES_DEV_DB
  },
  "test": {
    "dialect": "postgres",
    "url": process.env.NEWS_WIRES_TEST_DB
  },
  "production": {
    "dialect": "postgres",
    "url": process.env.NEWS_WIRES_PROD_DB
  }
};
