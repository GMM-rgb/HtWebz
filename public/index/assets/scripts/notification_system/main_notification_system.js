import * as NotifyUtility from "./notification_utility_modules/notification_main_interface.js";

/**
 * 
 */
class NotificationClient {
    /**
     * @param {string} RequestedNotificationMessage 
     * @param {number|undefined} RemoveAfter Interval in __`Seconds`__ 
     * @param {boolean|undefined} OptionallyReturnsNotification 
     * @returns {void}
     */
    static DeployNewNotification(RequestedNotificationMessage, RemoveAfter, OptionallyReturnsNotification) {
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
            const NotificationInstanceConstructor = new NotifyUtility.ActionNotification(RequestedNotificationMessage, isRemovingAutomatically);
            NotificationInstanceConstructor.PreBuildNotification().then(() => {
                console.log(`
                    Successfully pre-built an new Notification.\n
                    Message:\t${NotificationInstanceConstructor.message.toString()}
                `);
            });

        }

        return void null;
    }
}

if (window.DeployNewNotification !== null) {
    if (NotificationClient !== undefined && typeof(NotificationClient.DeployNewNotification) === "function") {
        Object.assign(window, NotificationClient.DeployNewNotification);
    }
}
