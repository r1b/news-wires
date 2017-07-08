module.exports = (env) => {
  return {
    // Values
    '$HREF': env === 'development' ? 'http://news.r1b.local:3000' : 'https://news.r1b.solutions',
    '/privacy': '/privacy',
    '/terms': '/terms',
    '/legal': '/legal',

    // copy / strings
    'news': 'news',
    'More': 'More',
    'Error': 'Error',
    'Invalid page': 'Invalid page',
    'Wire services for everyone': 'Wire services for everyone',
    'terms': 'terms',
    'terms of service': 'terms of service',
    'terms of service copy': 'News Wires is a hobby project that receives no outside funding. You can use the site in any way you\'d like - just be mindful that excessive automated requests to the site will incur a cost to the author & degrade the service for others.',
    'privacy': 'privacy',
    'privacy policy': 'privacy policy',
    'privacy policy copy': 'The only information News Wires stores about you is your public IP address. News Wires will never use any analytics software to track you. At the time of writing, News Wires has not been compelled to hand over any of its data to law enforcement',
    'Not Found': 'Not Found',
    'legal': 'legal',
    'disclaimer copy': 'The author provides no guarantees regarding the accuracy, fairness or completeness of any reporting linked here. Many press agencies around the world are controlled by governments, oligarchs & intelligence organizations. The reader must take care to understand the political climate surrounding each news source they choose to read.',
    'fair use copy': 'The headlines & links displayed here are protected under fair use.'
  };
};
