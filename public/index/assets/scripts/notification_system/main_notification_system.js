import * as NotifyUtility from "./notification_utility_modules/notification_main_interface.js";
/**
 * Function class for the __`Window`__ interface __Object__.
 */
class NotificationClient {
    /**
     * @param {string} RequestedNotificationMessage 
     * @param {number|undefined} RemoveAfter Interval in __`Seconds`__ 
     * @param {boolean|undefined} OptionallyReturnsNotification 
     * @returns {NotifyUtility.ActionNotification?}
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
            const NotificationInstanceConstructor = new NotifyUtility.ActionNotification(RequestedNotificationMessage.valueOf());
            NotificationInstanceConstructor.PreBuildNotification().then(() => {
                console.log(`
                    Successfully pre-built an new Notification.\n
                    Message:\t${NotificationInstanceConstructor.message.toString()}
                `);
            }).catch((PreBuildError) => {
                if (PreBuildError !== (null || undefined)) {
                    console.error(`Pre-Building new notification "${NotificationInstanceConstructor.message.toString()}" failed:\n${new String(PreBuildError)}`);
                }
            });

            if (OptionallyReturnsNotification !== (null || undefined) && typeof(OptionallyReturnsNotification) === "boolean") {
                if (new Boolean(OptionallyReturnsNotification).valueOf() === true) {
                    return NotificationInstanceConstructor !== null ? NotificationInstanceConstructor : null;
                }
            }
        }

        return null;
    }
}

if (window.DeployNewNotification !== null) {
    if (NotificationClient !== undefined && typeof(NotificationClient.DeployNewNotification) === "function") {
        window.DeployNewNotification = NotificationClient.DeployNewNotification || null;
    }
}
