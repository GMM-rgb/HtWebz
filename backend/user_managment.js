const path = require('path');
let CurrentUsersOnline = {};

// Generate Anonymous Guest User with random ID separated by underscore
function generateGuestUserID() {
  const randomID = Math.random().toString(36).substring(2, 10);
  return `Guest_${randomID}`;
}

// Hook into socket connections to manage guest lifecycle
function attachSocketHandlers(io) {
  io.on('connection', (socket) => {
    socket.on('registerGuest', (data) => {
      let guestID = data.guestID;

      if (!guestID || !CurrentUsersOnline[guestID]) {
        // Generate new guest if none provided
        guestID = generateGuestUserID();
      }

      // Default to guest unless they’ve registered
      const userType = guestID.startsWith('Guest_') ? 'guest' : 'registered';

      CurrentUsersOnline[guestID] = { type: userType, connectedAt: Date.now() };
      console.log(`${userType} connected: ${guestID}`);

      // Send ID and type back to client
      socket.emit('welcome', { guestID, type: userType });

      socket.on('disconnect', () => {
        delete CurrentUsersOnline[guestID];
        console.log(`${userType} disconnected: ${guestID}`);
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
