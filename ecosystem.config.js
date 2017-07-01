module.exports = {
  apps : [
    {
      name        : "integrator",
      script      : "./news-wires-integrator/bin/integrator.js",
      watch       : true,
      env: {
        "NODE_ENV": "development",
      },
      env_production: {
        "NODE_ENV": "production",
      },
      merge_logs: true,
      log_date_format : "YYYY-MM-DD HH:mm Z"
    },
    {
      name        : "scraper",
      script      : "./news-wires-scraper/bin/scraper.js",
      watch       : true,
      env: {
        "NODE_ENV": "development",
      },
      env_production: {
        "NODE_ENV": "production",
      },
      merge_logs: true,
      log_date_format : "YYYY-MM-DD HH:mm Z"
    },
    {
      name       : "web",
      script     : "./news-wires-ui/bin/www",
      instances  : 2,
      exec_mode  : "cluster",
      watch      : true,
      env: {
        "NODE_ENV": "development",
      },
      env_production: {
        "NODE_ENV": "production",
      },
      merge_logs: true,
      log_date_format : "YYYY-MM-DD HH:mm Z"
    }
  ]
}
