// Built-in Modules
const { stdout } = require('process');
const express = require('express');
const path = require('path');
const fs = require("fs");
const http = require('http');
const socketIO = require('socket.io');
const readline = require('readline');
const picocolors = require('picocolors');
const bodyParser = require('body-parser');
// Critical Project Modules
const AutoUpdater = require('./backend/auto_updater');
// External Modules
const UserManagmentModule = require('./backend/user_managment');
const DataStoreModle = require('./backend/datastore_backend_system');
const ErrorReportUtility = require("./backend/error_report_system/reporter_utility");
const ChatSystemMain = require("./backend/chat_system/chat_system_main");
// Pre-configured; unathorized message variable
const UnauthorizedMessage = `<span style="font-family:Arial;color:red;">Unauthorized to view requested resource.</span>`;

const app = express();
const PORT = process.env.PORT || 3000;
/**
 * Determines if any of the required directorys that are missing were just fixed.
 * @type {boolean}
 */
let FixedMissingDirectorys = false;
// Inital setup
(async () => {
  FixedMissingDirectorys = await ErrorReportUtility.ErrorReportValidation.ValidateReports();
})();

const videoDirectory = path.join(__dirname, "backend", "data", "video_files");

readline.emitKeypressEvents(process.stdin);
process.stdin.setEncoding('utf8');

// ===== DOMAIN FORWARDING CONFIGURATION =====
const ENABLE_DOMAIN_FORWARDING = false; // Toggle: false to disable for development mode
const TARGET_DOMAIN = 'htwebz.io';
// ============================================

// Define the directory to serve (the HtWebz/public folder only)
const serveDirectory = path.resolve(__dirname, 'public');
/*
 * Middleware: domain forwarding
*/
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

// Middleware: body parser
app.use(bodyParser.json());

// ===== DYNAMIC ROUTES =====
app.get('/public', (req, res) => {
  res.send('Serving all files from the HtWebz/public folder! Navigate to /file_name to access specific files.');
});

app.get('/videos', (req, res) => {
  const RequestedVideoID = req.query.id; // Gets the ?id= parameter
  let isAuthorized = false; // tracks if the user that requested the resource is authorized or not
  /**
   * @returns {boolean}
   */
  function videoValid() {
    const expectedVideoPath = path.join(videoDirectory, RequestedVideoID);
    let expectedVideoData = path.join(expectedVideoPath, "extra.json");
    let expectedVideo = path.join(expectedVideoPath, `${RequestedVideoID}.mp4`);
    if (RequestedVideoID && videoDirectory !== null && (fs.existsSync(expectedVideoPath))) {
      if (fs.existsSync(expectedVideo)) {
        return true;
      }
    }
    return false;
  }

  if (RequestedVideoID === null) {
    return res.status(400).send("Please provide a video ID: /video?id=your-video-id");
  }
  
  if (RequestedVideoID !== null) {
    if (videoValid()) {
      isAuthorized = true; // just authorize everything for now. (temp)
      console.log(`Requested Video -> ID: ${RequestedVideoID}`);
    } else {
      console.log("Video-ID for video, is not valid or does not exist.");
    }
  }
  
  if (isAuthorized) {
    res.sendFile(path.join(serveDirectory, "video_explorer.html"));
  } else {
    res.status(403).send(`${UnauthorizedMessage}`);
  }
});

app.get('/homepage', async (req, res) => {
  res.sendFile(path.join(serveDirectory, "index.html"));
});

app.get('/chat', (req, res) => {
  res.sendFile(path.join(serveDirectory, "connection_message_page.html"));
});

/*
 - API Endpoints for User Management
*/
app.get('/account-status', (req, res) => UserManagmentModule.getAccountStatus);
app.get('/account-data-fetch', async (req, res) => UserManagmentModule.usersAccountDataFetch);
app.post('/account-register', async (req, res) => UserManagmentModule.registerAccount);

/*
 - API Endpoints for Data Store Module
*/
app.get('/datastore-send', (req, res) => {
  res.send(DataStoreModle.getUsers());
});

app.post('/datastore-receive', (req, res) => {
  const HeadData = req.body;
  let IsAJsonData = HeadData.isJSON_Boolean;
  let MainData = HeadData.DATA ? HeadData.DATA : null;

  if (!HeadData || HeadData === null) {
    res.status(400).send({ message: "❌ ERR: No data was received.\n" });
    console.error(picocolors.red("ERR:\tNo data was received."));
  } else {
    res.status(200).send({ message: "✅ SUCCESS: Data was received." });
    console.log(picocolors.green("SUCCESS:\tData was received.\n"));
  }
  if (MainData !== null) console.log("DataReceived:\n\t", MainData , "\n");
});

// Redirects the user to the websites homepage
app.get('/', async (req, res) => {
  res.redirect("/homepage");
});

// ===== STATIC MIDDLEWARE (AFTER DYNAMIC ROUTES) =====
// This serves static files from the public folder
app.use(express.static(serveDirectory));

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

const updater = new AutoUpdater({
  checkInterval: 300000, // Check every 5 minutes for updates
  branch: 'Stable_Main_1', // Main production git branch
  autoRestart: true,
  repositoryPath: __dirname
});

io.on("ClientErrorReport", async (msg, feedback) => {
  if ((typeof msg !== "string") || (typeof feedback !== "boolean")) return;

  
});

// Attach socket handlers for APIs' lifecycle
UserManagmentModule.attachSocketHandlers(io);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running and serving the HtWebz/public folder on http://localhost:${PORT}`);
  console.log(
    ENABLE_DOMAIN_FORWARDING
      ? `Domain forwarding enabled: redirecting to http://${TARGET_DOMAIN}`
      : 'Domain forwarding disabled > development mode'
  );
  console.log('\n', picocolors.cyan(`\t\t\t      W e l c o m e  T o `), picocolors.blueBright(`
    ___  ___  _________  ___       __   _______   ________  ________     
   |\\  \\|\\  \\|\\___   ___\\\\  \\     |\\  \\|\\  ___ \\ |\\   __  \\|\\  ___   \\    
    \\ \\  \\\\\\  \\|___ \\  \\_\\ \\  \\    \\ \\  \\ \\   __/|\\ \\  \\|\\  \\ \\___/  /|   
     \\ \\   __  \\   \\ \\  \\ \\ \\  \\  __\\ \\  \\ \\  \\_|/_\\ \\   __  \\   /  / /   
      \\ \\  \\ \\  \\   \\ \\  \\ \\ \\  \\|\\__\\_\\  \\ \\  \\_|\\ \\ \\  \\|\\  \\ /  /_/__  
       \\ \\__\\ \\__\\   \\ \\__\\ \\ \\____________\\ \\_______\\ \\_______\\________\\
        \\|__|\\|__|    \\|__|  \\|____________|\\|_______|\\|_______|\\|_______|
                              
                        ${picocolors.cyan('T h e   D i g i t a l   W o r l d')}\n       
  `));
  // Initalize the auto-updater utility system
  updater.startAutoUpdate();
});

let shuttingDown = false;
// Shutdown handler on exit
process.on('SIGINT', () => {
  if (shuttingDown) return;
  shuttingDown = true;
  
  updater.stopAutoUpdate(); // Makes sure the auto updater doesn't continue running on it's own independent thread; when the server is shut down.

  let invalidShown = false;
  let confirmed = false;
  let CanceledConfirm = false;
  const CurrentConnections = UserManagmentModule.CurrentNumberOfUsersOnline();
  let HasWarnings = false;

  console.log(`\n===================\nShutting down...\n\nProcessPort:\t${process.debugPort}\nConnections:\t${CurrentConnections !== null && CurrentConnections !== undefined ? CurrentConnections : (0 && ConsoleWarnShutdown?.("WARNING: Connection Integer was null or undefined."))}\n`);

  function ConsoleWarnShutdown(warn_message) {
    if (!HasWarnings) {
      HasWarnings = true;
      stdout._write("WARNINGS:\n");
    }
    return console.warn(`\t${warn_message}`);
  }

  if ((CurrentConnections instanceof Number || typeof CurrentConnections === "number") && CurrentConnections > 0) {
    (server.closeAllConnections?.() ?? ConsoleWarnShutdown?.("WARNING: Could not close connections, module does not exist or failed.")) && console.log("SUCESS: Closed all remaining connections.");
  }

  // Kick all connected sockets (devices)
  io.sockets.sockets.forEach((socket) => {
    socket.disconnect(true); // force disconnect
  });

  console.log("\nShut Down?\t Y/N");
  stdout._write("CHOOSE: ");

  process.stdin.on("data", function (key) {
    // Always allow Ctrl+C to exit
    if (key === "\u0003") {
      console.log("\nForce exit.");
      process.exit();
    }

    // Normalize to lowercase
    const keyName = key.trim().toLowerCase();

    if (keyName === "y") {
      confirmed = true;
    } else if (keyName === "n") {
      confirmed = false;
    } else if (key === "\r" || key === "\n") {
      // Enter just resets cycle
      return;
    } else {
      console.log(picocolors.red("\nInvalid Key! Press Y to confirm shutdown or N to cancel."));
      stdout._write("CHOOSE: ");
      return;
    }

    // Stop listening once we have a valid answer
    process.stdin.removeAllListeners("data");

    try {
      if (confirmed) {
        server.close(() => {
          shuttingDown = false;
          console.log(`\nServer closed.`);
          console.log("===================\n");
          process.exit(0);
        });
      } else {
        if (!CanceledConfirm) {
          console.log("\nShutdown Canceled!\n");
          CanceledConfirm = true;
        }
        shuttingDown = false;
      }
    } catch (ShutdownError) {
      shuttingDown = false;
      throw new Error(`ShutdownError:\n${ShutdownError}`);
    }
  });
});
