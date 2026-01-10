module.exports = {
  apps: [{
    name: 'htwebz',
    script: './server.js',
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};