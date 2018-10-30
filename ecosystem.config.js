const production = require("./config/production.json");

console.log(production);

module.exports = {
  apps: [
    {
      name: "pyphoy",
      script: "dist/bin/server.js",
      env_production: {
        NODE_ENV: "production",
        PORT: 3246
      }
    }
  ],
  deploy: {
    production: {
      user: production.USER,
      host: production.HOST,
      port: production.PORT,
      ref: "origin/master",
      repo: "git@github.com:archemiro/pyphoy.git",
      path: "/home/pyphoy/pyphoy",
      "post-deploy":
        "npm install && npm run build && pm2 startOrRestart ecosystem.config.js --env production && pm2 save"
    }
  }
};
