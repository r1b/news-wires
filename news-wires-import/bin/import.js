const importer = require('..');

if (process.argv.length < 3) {
  console.error('usage: import <screenName> [sourceName]');
  process.exit(1);
}

importer(process.argv[2], process.argv[3] || 'UNKNOWN')
  .then((lcp) => { console.log(lcp) })
  .catch((error) => { console.error(error) })
