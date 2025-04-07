const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

let servicePath = path.join(__dirname, 'service_get.xml');

postMessage('Starting service distribution...');

app.post('/api', function (req, res) {
  res.send('POST requested to the homepage');
  req.body = req.body || {};
})

console.log('Service path:', servicePath);
console.log('Current directory:', __dirname); // Log the current working directory
