module.exports = (env) => {
  return {
    // Values
    '$HREF': env === 'development' ? 'http://news.r1b.local:3000' : 'https://news.r1b.solutions',
    '/privacy': '/privacy',
    '/terms': '/terms',
    '/legal': '/legal',
    '/contribute': '/contribute',

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
    'fair use copy': 'The headlines & links displayed here are protected under fair use.',
    'contribute': 'contribute',
    'Contribute': 'Contribute',
    'Code': 'Code',
    'code copy': 'You can find the source code for news-wires on <a href="https://github.com/r1b/news-wires/">GitHub</a>. All contributions are welcome.',
    'Donate': 'Donate',
    'donate copy': 'It currently costs ~$25 / mo to run news-wires. If you have any money that you do not want, please send it to 137YADrzRA8hKt3CQs4TQUANz7THnVPiSn (BTC) or 0x7Df1c2cA14bdFC222cB044251505E4Ee44d0a4cF (ETH). If you would like to donate in another way (hardware, intoxicants, personal thanks) please contact the author directly at <a href="mailto:sysop+donate@r1b.solutions">sysop+donate@r1b.solutions</a>.',
    'Translate': 'Translate',
    'translate copy': 'The author is seeking translators for site copy. If you know Spanish, Mandarin, Hindi or Arabic & would like to be paid to translate copy please contact <a href="mailto:sysop+translation@r1b.solutions">sysop+translation@r1b.solutions</a>.',
    'Suggest a source': 'Suggest a source',
    'suggest copy': 'If you would like to see a particular news source on the site please contact <a href="mailto:sysop+tip@r1b.solutions">sysop+tip@r1b.solutions</a>. Acceptable sources include press agencies that are in the business of selling news (e.g: Reuters, Associated Press, Agence France Presse) or independent international bureaus (e.g: Non-Aligned Movement News Network, Inter Press Service). Unacceptable sources include broadcasters (e.g: CNN, NPR, BBC), newspapers (e.g: Washington Post, New York Times, USA Today) and political publications (e.g: Socialist Worker, Reason). Priority will be given to non-Western news sources with an international perspective.'
  };
};
