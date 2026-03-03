/*
!strict NodeJS
*/
const picocolors = require('picocolors');
const path = require('path');
const fs = require('fs');
const json = require('body-parser/lib/types/json');

/**
 * 
 * @type {Object?}
 */
let UserDataJSON = null;

/**
 * @type {string}
 */
const dataDirectory = path.join(__dirname, 'data');
/**
 * @type {string}
 */
const userDataDirectory = path.join(__dirname, 'user_data');
/**
 * @type {string}
 */
const usersFilePath = path.join(dataDirectory, 'users.json');
/**
 * @type {string}
 */
const videoData = path.join(dataDirectory, 'video_files');
/**
 * Verifies if the directorys & files exist, if not this creates them as fresh new files.
 * @returns {Promise<true|false>}
 */
async function verifyDataDirectorys() {
    let success = false;
    if (!dataDirectory || !userDataDirectory || !usersFilePath) return;
    /**
     * @param {string} message_input
     * @returns {ErrorCallback}
     */
    function createFileSystemError(message_input) {
        if (!message_input || message_input === null) return;
        throw new Error(message_input);
    }
    // Create the data folder directory if non-existent
    if (!fs.existsSync(dataDirectory)) {
        fs.mkdirSync(dataDirectory);
        success = true;
    }
    // Initialize users.json if it doesn't exist
    if (!fs.existsSync(usersFilePath)) {
        fs.writeFileSync(usersFilePath, JSON.stringify({ users: {}}, null, 2));
        success = true;
    }
    // Create the user_data folder directory if non-existent
    if (!fs.existsSync(userDataDirectory)) {
        fs.mkdirSync(userDataDirectory);
        success = true;
    }
    // Create the video_data directory if doesn't exist
    if (!fs.existsSync(videoData)) {
        fs.mkdirSync(videoData);
        success = true;
    }
    if (success === null) return false;
    return success || false;
}
verifyDataDirectorys();

module.exports = {
    /**
     * @returns {Promise<Object>} The users object
     */
    getUsers: async function() {
        const usersData = fs.readFileSync(usersFilePath);
        return new Promise(JSON.parse(usersData));
    },
    /**
     * @param {Object} user - The user object to add
     */
    addUser: function(user) {
        const users = this.getUsers();
        users.users[user.id] = user;
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    },
    /**
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
};

UserDataJSON = this.getUsers;
