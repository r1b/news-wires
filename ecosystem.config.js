module.exports = {
  apps : [
    {
      name        : "integrator",
      script      : "./news-wires-integrator/bin/integrator.js",
      watch       : true,
      env: {
        "NODE_ENV": "production",
      }
    },
    {
      name        : "scraper",
      script      : "./news-wires-scraper/bin/scraper.js",
      watch       : true,
      env: {
        "NODE_ENV": "production",
      }
    },
    {
      name       : "web",
      script     : "./news-wires-ui/bin/www",
      instances  : 2,
      exec_mode  : "cluster",
      watch      : true,
      env: {
        "NODE_ENV": "production",
      }
    }
  ]
}
