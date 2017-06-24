module.exports = (env) => {
  return {
    // Values
    '$HREF': env === 'development' ? 'http://news.r1b.local:3000' : 'https://news.r1b.solutions',
    '/privacy': '/privacy',
    '/terms': '/terms',

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
    'Not Found': 'Not Found'
  };
};
