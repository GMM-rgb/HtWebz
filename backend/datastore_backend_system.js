const path = require('path');
const fs = require('fs');

const dataDirectory = path.join(__dirname, 'data');
const usersFilePath = path.join(dataDirectory, 'users.json');

if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory);
}

// Initialize users.json if it doesn't exist
if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, JSON.stringify({ users: {}}, null, 2));
}

module.exports = {
    /**
     * 
     * @returns {Object} The users object
     */
    getUsers: function() {
        const usersData = fs.readFileSync(usersFilePath);
        return JSON.parse(usersData);
    },
    /**
     * 
     * @param {Object} user - The user object to add
     */
    addUser: function(user) {
        const users = this.getUsers();
        users.users[user.id] = user;
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    }
};
