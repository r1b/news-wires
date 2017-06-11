const URL = require('url');
const request = require('request-promise-native');
const Twitter = require('twitter');
const Trie = require('news-wires-trie');

const twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

function getUrlsFromStatuses (screenName) {
  return (
    twitterClient
      .get('statuses/user_timeline', {
        screen_name: screenName,
        count: 200,
        exclude_replies: true,
        include_rts: false
      })
      .then(function (tweets) {
        return (
          tweets
            .map(function (tweet) {
              return (
                tweet.entities.urls
                  .map((url) => url.expanded_url)
                  .filter((url) => url !== null) // XXX not sure why these are missing sometimes
              );
            })
            .reduce((x, y) => x.concat(y), [])
        );
      })
  );
}

function normalizeUrls (urls) {
  return Promise.all(
    urls
      .map((url) => {
        console.log(`Fetching ${url}`);
        return (
          request({'uri': url, 'resolveWithFullResponse': true, 'maxRedirects': 30})
            .then((response) => {
              return response.request.uri.href;
            })
            .catch((error) => {
              console.error(error);
              return null;
            })
        );
      })
  );
}

function findUrlRegex (normalizedUrls) {
  normalizedUrls = normalizedUrls.filter((url) => url !== null);

  let originFrequency = {};
  let topOrigin = {origin: null, count: 0};

  for (let url of normalizedUrls) {
    url = URL.parse(url);

    // Ignores embedded tweets
    if (url.hostname === 'twitter.com') { continue; }

    // FIXME : The WHATWG api would be less brittle
    let origin = `${url.protocol}//${url.hostname}`;

    if (originFrequency[origin] === undefined) {
      originFrequency[origin] = 1;
    }
    else {
      originFrequency[origin] = originFrequency[origin] + 1;
    }

    if (topOrigin.count < originFrequency[origin]) {
      topOrigin = { origin: origin, count: originFrequency[origin] }
    }
  }

  normalizedUrls = normalizedUrls.filter((url) => {
    return url.startsWith(topOrigin.origin);
  });

  let urlTrie = new Trie();

  normalizedUrls.forEach((url) => {
    urlTrie.insert(url, true);
  });

  return urlTrie.lcp();
}

module.exports = function (screenName) {
  return (
    getUrlsFromStatuses(screenName)
      .then(normalizeUrls)
      .then(findUrlRegex)
      .catch((error) => console.log(error))
  );
};
