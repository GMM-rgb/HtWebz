const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ===== DOMAIN FORWARDING CONFIGURATION =====
const ENABLE_DOMAIN_FORWARDING = false; // Toggle: set to false to disable for development mode
const TARGET_DOMAIN = 'htwebz.io';
// ============================================

// Define the directory to serve (the HtWebz folder)
const serveDirectory = path.resolve(__dirname);

// Domain forwarding middleware
if (ENABLE_DOMAIN_FORWARDING) {
  app.use((req, res, next) => {
    const host = req.get('host');
    
    // Extract hostname without port
    const hostname = host ? host.split(':')[0] : '';
    
    // Check if the request is not coming from the target domain
    if (hostname && hostname !== TARGET_DOMAIN && hostname !== 'localhost' && hostname !== '127.0.0.1') {
      // Redirect to the target domain, preserving the path and query string
      const protocol = req.secure || req.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
      const redirectUrl = `${protocol}://${TARGET_DOMAIN}${req.originalUrl}`;
      
      console.log(`Redirecting from ${hostname} to ${TARGET_DOMAIN}`);
      return res.redirect(301, redirectUrl);
    }
    
    next();
  });
}

// Serve static files from the HtWebz folder
app.use(express.static(serveDirectory));

// Basic route for convenience
app.get('./../public/', (req, res) => {
  res.send('Serving all files from the HtWebz folder! Navigate to /file_name to access specific files.');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running and serving the HtWebz folder on http://localhost:${PORT}`);
  if (ENABLE_DOMAIN_FORWARDING) {
    console.log(`Domain forwarding enabled: redirecting to http://${TARGET_DOMAIN}`);
  } else {
    console.log(`Domain forwarding disabled`);
  }
});
