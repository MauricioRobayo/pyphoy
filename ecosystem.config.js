module.exports = {
  apps: [
    {
      name: "pyphoy",
      script: "dist/bin/server.js",
      env_production: {
        NODE_ICU_DATA: "/usr/lib/node_modules/full-icu",
        NODE_ENV: "production",
        PORT: 3246
      }
    }
  ],
  deploy: {
    production: {
      user: process.env.PYPHOY_PRODUCTION_USER,
      host: process.env.PYPHOY_PRODUCTION_HOST,
      port: process.env.PYPHOY_PRODUCTION_PORT,
      ref: "origin/master",
      repo: "git@github.com:archemiro/pyphoy.git",
      path: "/home/node/pyphoy",
      "post-deploy":
        "npm install && npm run build && pm2 startOrRestart ecosystem.config.js --env production && pm2 save"
    }
  }
};
