module.exports = function (name) {
  name = name.toUpperCase();
  return {
    consumer_key: process.env['TWITTER_CONSUMER_KEY_'+name],
    consumer_secret: process.env['TWITTER_CONSUMER_SECRET_'+name],
    access_token: process.env['TWITTER_ACCESS_TOKEN_'+name],
    access_token_secret: process.env['TWITTER_ACCESS_TOKEN_SECRET_'+name]
  }
};
