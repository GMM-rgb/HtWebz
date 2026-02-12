import * as NotificationUtility from "./notification_utility_modules/notification_main_interface.js";

// /**
//  * 
//  * @typedef {Window & {
//  *  DeployNewNotification: typedof DeployNewNotification
//  * }} ModifiedWindow
//  * 
//  */

/**
 * @typedef {window} ModifiedWindow
 * @property {ModifiedWindow & DeployNewNotification}
 */

/**
 * 
 * @param {string} RequestedNotificationMessage
 * @param {number|undefined} RemoveAfter Interval in __`Seconds`__
 * @returns {void}
 */
function DeployNewNotification(RequestedNotificationMessage, RemoveAfter) {
    const NotificationInstanceConstructor = new NotificationUtility.ActionNotification();

    return void null;
}

// Append function `DeployNewNotification` to window
Object.assign(window, DeployNewNotification);
