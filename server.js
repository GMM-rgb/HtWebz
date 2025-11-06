const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const readline = require('readline');

const UserManagmentModule = require('./backend/user_managment');

const app = express();
const PORT = process.env.PORT || 3000;

readline.emitKeypressEvents(process.stdin);
process.stdin.setEncoding('utf8');

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

// ===== ERROR HANDLING =====

// 404 handler (no route matched)
app.use((req, res) => {
  res.status(404).sendFile(path.join(serveDirectory, 'index/Error/content_not_found.html'));
});

// 500 handler (critical server error)
app.use((err, req, res, next) => {
  console.error('Critical server error:', err.stack || err);
  res.status(500).sendFile(path.join(serveDirectory, 'index/Error/critical_error.html'));
});

// ===== SERVER CREATION =====
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

// Shutdown handler on exit
process.on('SIGINT', () => {
  let confirmed = false;
  let CurrentConnections = server.connections;
  console.log(`\n===================\nShutting down...\n\nProcessPort:\t${process.debugPort}\nConnections:\t${CurrentConnections ? CurrentConnections !== null : (0 && console.warn("WARNING: Connection Integer was null or undefined."))}\n`);

  if ((CurrentConnections instanceof Number || typeof CurrentConnections === "number") /*&& CurrentConnections > 0*/) {
    (server.closeAllConnections?.() ?? console.warn("WARNING: Could not close connections, module or does not exist or failed.")) && console.log("SUCESS: Closed all remaining connections.");
  }
  
  // Kick all connected sockets
  io.sockets.sockets.forEach((socket) => {
    socket.disconnect(true); // force disconnect
  });

  console.log("Shut Down?\t Y/N");

  process.stdin.on("keypress", function(str, key_type) {
    let KeyName = `${key_type.name}`.toLocaleLowerCase();
    if (key_type && (key_type instanceof Object)) {
      if (KeyName === "y") {

      } else if (KeyName === "n") {

      }
    }
  });

  // Now close the server
  if (confirmed && typeof confirmed === "boolean") server.close(() => {
    console.log(`Server closed.`);
    console.log("===================\n");
    process.exit(0);
  }).catch((ShutdownError) => {
    throw new Error(ShutdownError);
  }); else {
    process.off('SIGINT', this);
  }
});
