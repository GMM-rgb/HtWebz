## Auto-Updater Setup Guide

### 1. Install Process Manager
* Install the following package below.
```bash
npm install -g pm2
```
### 2. Create a ecosystem.config.js wherever you would like, I would recommend using the project directory itself.
```js
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
```
### 3. Then procced to run the file.
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # Adds auto-start on system boot
```

### Notes:
- If need to restart run...
```bash
pm2 restart htwebz
pm2 logs htwebz
```

```bash
%npm% exec -g pm2
```