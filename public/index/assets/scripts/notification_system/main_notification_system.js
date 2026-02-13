import * as NotificationUtility from "./notification_utility_modules/notification_main_interface.js";

/**
 * 
 */
class NotificationClient {
    /**
     * @param {string} RequestedNotificationMessage
     * @param {number|undefined} RemoveAfter Interval in __`Seconds`__
     * @returns {void}
     */
    static DeployNewNotification(RequestedNotificationMessage, RemoveAfter) {
        let isRemovingAutomatically = new Boolean(false).valueOf();
        let WillBeRemovingAfter = new Number(0).valueOf();

        if (RemoveAfter !== (null || undefined) && typeof(RemoveAfter) === "number" && RemoveAfter.valueOf() > 0) {
            WillBeRemovingAfter = RemoveAfter.valueOf();
            isRemovingAutomatically = true;
        } else {
            if (isRemovingAutomatically === true) {
                isRemovingAutomatically = false;
            }
        }

        if (RequestedNotificationMessage !== (null || undefined) && typeof(RequestedNotificationMessage) === "string") {
            const NotificationInstanceConstructor = new NotificationUtility.ActionNotification(RequestedNotificationMessage, isRemovingAutomatically);
        }

        return void null;
    }
}

if (window.DeployNewNotification !== null) {
    if (NotificationClient && typeof(NotificationClient.DeployNewNotification) === "function") {
        Object.assign(window, NotificationClient.DeployNewNotification);
    }
}
