module.exports = {
  apps: [
    {
      name: "pyphoy",
      script: "src/bin/server.js",
      env_production: {
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
      ssh_options: "StrictHostKeyChecking=no",
      ref: "origin/master",
      repo: "git@github.com:picoyplaca/pyphoy.git",
      path: "/home/pyphoy/pyphoy",
      "post-deploy":
        "npm install && npm run build && pm2 startOrRestart ecosystem.config.js --env production && pm2 save"
    }
  }
};
