const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

app = require('express')();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const os = require('os');

let servicePath = path.join(__dirname, 'service_get.xml');

console.log('Starting service distribution...\n');

app.post('/api', function (req, res) {
  res.send(servicePath);
  req.body = req.body || {};
});

console.log('\nDirectory Paths:');
console.log('Service path:', servicePath); // Log the service path
console.log('Service resolved path:', path.resolve(servicePath)); // Log the resolved service path
console.log('Service joined path:', path.join(__dirname, servicePath)); // Log the joined service path
console.log('Current directory:', __dirname); // Log the current working directory

// Get the local network IP address
const networkInterfaces = os.networkInterfaces();
let localIp = '127.0.0.1'; // Default to localhost

for (const interfaceName in networkInterfaces) {
  const interfaces = networkInterfaces[interfaceName];
  for (const iface of interfaces) {
    if (iface.family === 'IPv4' && !iface.internal) {
      localIp = iface.address;
      break;
    }
  }
}

const PORT = 8004; // Define the port to listen on

app.listen(PORT, localIp, () => {
  console.log(`Service is running at http://${localIp}:${PORT}`);
});
