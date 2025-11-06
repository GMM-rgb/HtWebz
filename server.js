const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const UserManagmentModule = require('./backend/user_managment');

const app = express();
const PORT = process.env.PORT || 3000;

// ===== DOMAIN FORWARDING CONFIGURATION =====
const ENABLE_DOMAIN_FORWARDING = false; // Toggle: set to false to disable for development mode
const TARGET_DOMAIN = 'htwebz.io';
// ============================================

// Define the directory to serve (the HtWebz/public folder only)
const serveDirectory = path.resolve(__dirname, 'public');

// Middleware: domain forwarding
if (ENABLE_DOMAIN_FORWARDING) {
  app.use((req, res, next) => {
    const host = req.get('host');
    const hostname = host ? host.split(':')[0] : '';

    if (
      hostname &&
      hostname !== TARGET_DOMAIN &&
      hostname !== 'localhost' &&
      hostname !== '127.0.0.1'
    ) {
      const protocol =
        req.secure || req.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
      const redirectUrl = `${protocol}://${TARGET_DOMAIN}${req.originalUrl}`;

      console.log(`Redirecting from ${hostname} to ${TARGET_DOMAIN}`);
      return res.redirect(301, redirectUrl);
    }

    next();
  });
}

// Middleware: serve static files from the public folder only
app.use(express.static(serveDirectory));

// Routes
app.get('/public/', (req, res) => {
  res.send('Serving all files from the HtWebz/public folder! Navigate to /file_name to access specific files.');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(serveDirectory, 'index.html'));
});

// API Endpoints for User Management
app.get('/account-status', UserManagmentModule.getAccountStatus);
app.get('/account-data-fetch', UserManagmentModule.usersAccountDataFetch);
app.post('/account-register', UserManagmentModule.registerAccount);

// Create HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = socketIO(server);

// Attach socket handlers for guest lifecycle
UserManagmentModule.attachSocketHandlers(io);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running and serving the HtWebz/public folder on http://localhost:${PORT}`);
  console.log(
    ENABLE_DOMAIN_FORWARDING
      ? `Domain forwarding enabled: redirecting to http://${TARGET_DOMAIN}`
      : 'Domain forwarding disabled'
  );
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down...');
  server.close(() => process.exit(0));
});
