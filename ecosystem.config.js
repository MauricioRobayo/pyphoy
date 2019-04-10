module.exports = {
  apps: [
    {
      name: 'pyphoy',
      script: 'src/bin/server.js',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3246,
      },
    },
    {
      name: 'pyphoy-dev',
      script: 'src/bin/server.js',
      env_development: {
        NODE_ENV: 'production',
        PORT: 3247,
      },
    },
  ],
  deploy: {
    production: {
      user: process.env.PYPHOY_PRODUCTION_USER,
      host: process.env.PYPHOY_PRODUCTION_HOST,
      port: process.env.PYPHOY_PRODUCTION_PORT,
      ssh_options: 'StrictHostKeyChecking=no',
      ref: 'origin/master',
      repo: 'git@github.com:picoyplaca/pyphoy.git',
      path: '/home/pyphoy/pyphoy',
      'post-deploy':
        'npm install && npm run build && pm2 startOrRestart ecosystem.config.js --env production && pm2 save',
    },
    development: {
      user: process.env.PYPHOY_PRODUCTION_USER,
      host: process.env.PYPHOY_PRODUCTION_HOST,
      port: process.env.PYPHOY_PRODUCTION_PORT,
      ssh_options: 'StrictHostKeyChecking=no',
      ref: 'origin/develop',
      repo: 'git@github.com:archemiro/pyphoy.git',
      path: '/home/pyphoy/pyphoy-dev',
      'post-deploy':
        'npm install && npm run build && pm2 startOrRestart ecosystem.config.js --env development && pm2 save',
    },
  },
}
