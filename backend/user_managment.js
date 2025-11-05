const path = require('path');
// In-memory store JSON object for current users online
let CurrentUsersOnline = {};

module.exports = {
  getAccountStatus: (req, res) => {
    res.json({ onlineUsers: Object.keys(CurrentUsersOnline).length });
  },

  registerAccount: (req, res) => {
    const { username } = req.body;
    if (username) {
      CurrentUsersOnline[username] = true;
      res.json({ success: true, message: `User ${username} registered.` });
    } else {
      res.json({ success: false, message: 'Username is required.' });
    }
  }
};
