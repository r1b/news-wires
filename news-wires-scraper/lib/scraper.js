const Twitter = require('twit');
const models = require('news-wires-db');

const twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

module.exports = function () {
  models.NewsSource.findAll().then((newsSources) => {
    const userIds = newsSources.map((newsSource) => newsSource.twitterUserId).join(',');
    const stream = twitterClient.stream('statuses/filter', {follow: userIds});
    stream.on('tweet', (event) => {
      newsSources.forEach((newsSource) => {
        if (newsSource.twitterUserId === event.user.id_str) {
          let urls = (
            event.entities.urls
              .map((url) => url.expanded_url)
              .filter((url) => url !== null) // XXX not sure why these are missing sometimes
          );
          urls.forEach((url) => {
            newsSource
              .scrape(url)
              .then(([newsItem, newsSource]) => {
                console.log(`[${newsSource.get('name')}] ${newsItem.get('headline')} ${newsItem.get('url')}`);
              })
              .catch((error) => { console.error(error) });
          });
        }
      });
    });

    stream.on('error', (error) => {
      console.error(error);
    });

    stream.on('disconnect', (disconnectMessage) => {
      console.error('Twitter stream disconnected!');
      console.error(disconnectMessage);
    });
  });
};
