const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

app = require('express')();
const bodyParser = require('body-parser');

let servicePath = path.join(__dirname, 'service_get.xml');

console.log('Starting service distribution...');

app.post('/api', function (req, res) {
  res.send(servicePath);
  req.body = req.body || {};
});

console.log('Service path:', servicePath); // Log the service path
console.log('Service resolved path:', path.resolve(servicePath)); // Log the resolved service path
console.log('Service joined path:', path.join(__dirname, servicePath)); // Log the joined service path
console.log('Current directory:', __dirname); // Log the current working directory
