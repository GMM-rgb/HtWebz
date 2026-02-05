module.exports = {
  apps: [{
    name: 'HtWebz',
    script: './server.js',
    watch: true,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};