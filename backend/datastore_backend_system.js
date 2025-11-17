const picocolors = require('picocolors');
const path = require('path');
const fs = require('fs');
const json = require('body-parser/lib/types/json');

/**
 * 
 * @type {Object?}
 */
let UserDataJSON = null;

const dataDirectory = path.join(__dirname, 'data');
const userDataDirectory = path.join(__dirname, 'user_data');
const usersFilePath = path.join(dataDirectory, 'users.json');

async function verifyDataDirectorys() {
    if (!dataDirectory || !userDataDirectory || !usersFilePath) return;

    // Create the data folder directory if non-existent
    if (!fs.existsSync(dataDirectory)) {
        fs.mkdirSync(dataDirectory);
    }

    // Initialize users.json if it doesn't exist
    if (!fs.existsSync(usersFilePath)) {
        fs.writeFileSync(usersFilePath, JSON.stringify({ users: {}}, null, 2));
    }

    // Create the user_data folder directory if non-existent
    if (!fs.existsSync(userDataDirectory)) {
        fs.mkdirSync(userDataDirectory);
    }
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
    },
    /**
     * 
     * @param {string|Object} userToRemove 
     * @returns
     */
    removeUser: function(userToRemove) {
        const dr = false;
        if (!userToRemove || userToRemove === null) return dr;
        let SuccessfullyRemovedUser = false;

        if (this.getUsers !== null && this.getUsers instanceof Function) {
            const UserData = this.getUsers() || console.error(picocolors.red(`ERROR: Failed to fetch users from json data.`)).then(() => { return dr; });
            let NewUserData = null;
            
            if (UserData.hasOwnProperty(userToRemove)) {
                
            }
        } else {
            console.warn(picocolors.yellow(`WARNING: function: getUsers is not a function, or either invalid or missing.`));
            return dr;
        }

        if (SuccessfullyRemovedUser) {
            return true;
        } else {
            return dr;
        }
    },
    /**
     * 
     * @type {Function}
     */
    verifyDataExists: () => verifyDataDirectorys()
};

this.verifyDataExists;
UserDataJSON = this.getUsers;


