const path = require('path');
const picocolors = require('picocolors');

let CurrentUsersOnline = {};

function UserManagmentLogger(message) {
  const CurrentTime = new Date().toLocaleTimeString('en-US', { hour12: false });
  const lower = message.toLowerCase();

  if (lower.includes("disconnected:")) {
    console.log(
      `${picocolors.bgRed("[UserManagment]:")}\t${picocolors.bgBlack(`[${CurrentTime}] ${message}`)}`
    );
  } else if (lower.includes("connected:")) {
    console.log(
      `${picocolors.bgGreen("[UserManagment]:")}\t${picocolors.bgBlack(`[${CurrentTime}] ${message}`)}`
    );
  } else {
    console.log(
      `${picocolors.bgBlue("[UserManagment]:")}\t${picocolors.bgBlack(`[${CurrentTime}] ${message}`)}`
    );
  }
}

// Generate Anonymous Guest User with random ID separated by underscore
function generateGuestUserID() {
  const randomID = Math.random().toString(36).substring(2, 10);
  return `Guest_${randomID}`;
}

// Hook into socket connections to manage guest lifecycle
function attachSocketHandlers(io) {
  io.on('connection', async (socket) => {
    (socket || io).on('registerGuest', (data) => {
      let guestID = data.guestID;

      if (!guestID || !CurrentUsersOnline[guestID]) {
        // Generate new guest if none provided
        guestID = generateGuestUserID();
      }

      // Default to guest unless they’ve registered
      const userType = guestID.startsWith('Guest_') ? 'guest' : 'registered';

      CurrentUsersOnline[guestID] = { type: userType, connectedAt: Date.now() };
      UserManagmentLogger(`${userType} connected: ${guestID}`);

      // Send ID and type back to client
      (socket || io).emit('welcome', { guestID, type: userType });

      (socket || io).on('disconnect', () => {
        delete CurrentUsersOnline[guestID];
        UserManagmentLogger(`${userType} disconnected: ${guestID}`);
      });
    });
  });
}

module.exports = {
  CurrentNumberOfUsersOnline: () => Object.keys(CurrentUsersOnline).length,

  getAccountStatus: (req, res) => {
    res.json({ onlineUsers: Object.keys(CurrentUsersOnline).length });
  },

  usersAccountDataFetch: (req, res) => {
    res.json({ users: CurrentUsersOnline });
  },

  registerAccount: (req, res) => {
    const { username } = req.body;
    if (username) {
      CurrentUsersOnline[username] = { type: 'registered', connectedAt: Date.now() };
      res.json({ success: true, message: `User ${username} registered.` });
    } else {
      res.json({ success: false, message: 'Username is required.' });
    }
  },

  attachSocketHandlers,
};
