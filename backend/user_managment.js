const { type } = require('os');
const path = require('path');
const picocolors = require('picocolors');
const { stdout } = require('process');
const { Socket } = require('socket.io');

let CurrentUsersOnline = {};

function UserManagementLogger(message, level = 'info') {
  const CurrentTime = new Date().toLocaleTimeString('en-US', { hour12: false });
  const lower = message.toLowerCase();

  let prefix;
  if (level === 'error') {
    prefix = picocolors.bgRed("[UserManagement]:");
  } else if (level === 'warn') {
    prefix = picocolors.bgYellow("[UserManagement]:");
  } else if (lower.includes("disconnected:")) {
    prefix = picocolors.bgRed("[UserManagement]:");
  } else if (lower.includes("connected:")) {
    prefix = picocolors.bgGreen("[UserManagement]:");
  } else {
    prefix = picocolors.bgBlue("[UserManagement]:");
  }

  console.log(`${prefix}\t${picocolors.bgBlack(`[${CurrentTime}] ${message}`)}`);
}

function generateGuestUserID() {
  const randomID = Math.random().toString(36).substring(2, 10);
  return `Guest_${randomID}`;
}

/**
 * 
 * @public
 * @param {Socket} io 
 * @returns {void}
 */
function attachSocketHandlers(io) {
  /**
   * @template {typeof Socket.prototype} SocketPrototypeTemplate
   * @augments SocketPrototypeTemplate
   */
  io.on('connection', (
    /** 
     * @type {(typeof Socket.prototype) | undefined} 
     */ 
    /*  */ socket) => {
    UserManagementLogger(`Socket connected: ${socket.id}`);

    socket.on("reconnect_client", async (ClientSocketIP) => {
      await new Promise(async (ResolveClientConnection) => {
        console.debug(`Client connection did recover:\t${Boolean(socket.recovered)}?`);
        stdout._write("Attempting client reconnect recovery linkage...");
        await socket.handshake().then((HandshakeFinalizeResult) => {
          console.debug(picocolors.greenBright("Recovered client connection with remote-end.").valueOf());
        }).catch(() => {
          if (ResolveClientConnection !== null && typeof(ResolveClientConnection) === "function") {
            ResolveClientConnection();
          }
        });
      });
    });

    // Handle connect_error on the io level
    socket.on('connect_error', (err) => {
      UserManagementLogger(`Connection error on socket ${socket.id}: ${err.message}`, 'error');
    });

    socket.on('registerGuest', (data) => {
      try {
        // Validate data shape
        if (!data || typeof data !== 'object') {
          UserManagementLogger(`Invalid registerGuest payload from ${socket.id}`, 'warn');
          socket.emit('error', { message: 'Invalid registration payload.' });
          return;
        }

        let guestID = data.guestID;

        if (!guestID || !CurrentUsersOnline[guestID]) {
          guestID = generateGuestUserID();
        }

        const userType = guestID.startsWith('Guest_') ? 'guest' : 'registered';

        CurrentUsersOnline[guestID] = {
          type: userType,
          socketID: socket.id, // useful for debugging who is who
          connectedAt: Date.now()
        };

        UserManagementLogger(`${userType} connected: ${guestID}`);
        socket.emit('welcome', { guestID, type: userType });

        socket.on('disconnect', (reason) => {
          delete CurrentUsersOnline[guestID];
          // reason tells us WHY they disconnected — very useful
          UserManagementLogger(`${userType} disconnected: ${guestID} — reason: ${reason}`);
        });

      } catch (err) {
        UserManagementLogger(`Unexpected error during registerGuest: ${err.message}`, 'error');
        socket.emit('error', { message: 'Internal server error during registration.' });
      }
    });

    // Catch any unhandled errors on the socket itself
    socket.on('error', (err) => {
      UserManagementLogger(`Socket error on ${socket.id}: ${err.message}`, 'error');
    });
  });

  // Top level IO error — server-wide connection issues
  io.on('connect_error', (err) => {
    UserManagementLogger(`IO-level connection error: ${err.message}`, 'error');
  });
}

module.exports = {
  CurrentNumberOfUsersOnline: () => Object.keys(CurrentUsersOnline).length,

  getAccountStatus: (req, res) => {
    try {
      res.json({ onlineUsers: Object.keys(CurrentUsersOnline).length });
    } catch (err) {
      UserManagementLogger(`getAccountStatus failed: ${err.message}`, 'error');
      res.status(500).json({ success: false, message: 'Failed to get account status.' });
    }
  },

  usersAccountDataFetch: (req, res) => {
    try {
      res.json({ users: CurrentUsersOnline });
    } catch (err) {
      UserManagementLogger(`usersAccountDataFetch failed: ${err.message}`, 'error');
      res.status(500).json({ success: false, message: 'Failed to fetch user data.' });
    }
  },

  registerAccount: (req, res) => {
    try {
      const { username } = req.body;
      if (!username || typeof username !== 'string') {
        UserManagementLogger(`registerAccount called with invalid username`, 'warn');
        return res.status(400).json({ success: false, message: 'Valid username is required.' });
      }

      CurrentUsersOnline[username] = { type: 'registered', connectedAt: Date.now() };
      UserManagementLogger(`Account registered: ${username}`);
      res.json({ success: true, message: `User ${username} registered.` });

    } catch (err) {
      UserManagementLogger(`registerAccount failed: ${err.message}`, 'error');
      res.status(500).json({ success: false, message: 'Internal server error during registration.' });
    }
  },

  attachSocketHandlers,
};
