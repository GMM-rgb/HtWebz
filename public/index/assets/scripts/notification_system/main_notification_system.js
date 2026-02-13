import * as NotificationUtility from "./notification_utility_modules/notification_main_interface.js";

// /**
//  * 
//  * @typedef {Window & {
//  *  DeployNewNotification: typedof DeployNewNotification
//  * }} ModifiedWindow
//  * 
//  */

/**
 * @typedef {Parameters} DeployNewNotificationParameters
 * @extends {DeployNewNotificationParameters & {(RequestedNotificationMessage: string)}}
 */

/**
 * 
 */
class NotificationClient {
    /**
     * 
     * @param {string} RequestedNotificationMessage
     * @param {number|undefined} RemoveAfter Interval in __`Seconds`__
     * @returns {void}
     */
    static DeployNewNotification(RequestedNotificationMessage, RemoveAfter) {
        const NotificationInstanceConstructor = new NotificationUtility.ActionNotification();

        return void null;
    }
}

if (window.DeployNewNotification !== null) {
    if (NotificationClient && typeof(NotificationClient.DeployNewNotification) === "function") {
        Object.assign(window, NotificationClient.DeployNewNotification);
    }
}
