const path = require('path');

const { app } = require('./app_setup');
const UserManagmentModule = require('./backend/user_managment');

const PORT = process.env.PORT || 3000;

// ===== DOMAIN FORWARDING CONFIGURATION =====
const ENABLE_DOMAIN_FORWARDING = false; // Toggle: set to false to disable for development mode
const TARGET_DOMAIN = 'htwebz.io';
// ============================================

// Define the directory to serve (the HtWebz/public folder only)
const serveDirectory = path.resolve(__dirname, 'public');

// Domain forwarding middleware
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

// Serve static files from the public folder only
app.use(express.static(serveDirectory));

// Basic route for convenience
app.get('/public/', (req, res) => {
  res.send('Serving all files from the HtWebz/public folder! Navigate to /file_name to access specific files.');
});

// Explicit root route to load index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(serveDirectory, 'index.html'));
});

app.get("/account-status", (req, res) => {
  res.json();
  
});

app.post("/account-register", (req, res) => {
  
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running and serving the HtWebz/public folder on http://localhost:${PORT}`);
  if (ENABLE_DOMAIN_FORWARDING) {
    console.log(`Domain forwarding enabled: redirecting to http://${TARGET_DOMAIN}`);
  } else {
    console.log(`Domain forwarding disabled`);
  }
});
