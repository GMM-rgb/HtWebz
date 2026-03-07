import * as NotifyUtility from "./notification_utility_modules/notification_main_interface.js";
import * as NotificationListUtility from "./notification_utility_modules/notifications_list_manager.js";

/**
 * Function class for the __`Window`__ interface __Object__.
 */
class NotificationClient {
    /**
     * @param {string} RequestedNotificationMessage 
     * @param {string} NotificationHeaderLabel 
     * @param {number|undefined} RemoveAfter Interval in __`Seconds`__ 
     * @param {boolean|undefined} OptionallyReturnsNotification 
     * @returns {NotifyUtility.ActionNotification?}
     * @type {Function}
     */
    static DeployNewNotification(RequestedNotificationMessage, NotificationHeaderLabel, RemoveAfter, OptionallyReturnsNotification) {
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

        if (RequestedNotificationMessage !== (null || undefined) && typeof(RequestedNotificationMessage) === "string" && NotificationHeaderLabel !== (null || undefined) && typeof(NotificationHeaderLabel) === "string") {
            const NotificationInstanceConstructor = new NotifyUtility.ActionNotification(new String(RequestedNotificationMessage).valueOf(), new String(NotificationHeaderLabel).trim().valueOf());

            function FormatedNotificationMessage() {
                let FormatedNotificationMessage = new String(NotificationInstanceConstructor.message).valueOf();
                let NotificationMessageEnd = NotificationInstanceConstructor.message.charAt(NotificationInstanceConstructor.message.length).valueOf();
                if (NotificationMessageEnd.includes(".")) {
                    return FormatedNotificationMessage.trimEnd();
                } else {
                    return FormatedNotificationMessage.trimEnd() + ".";
                }
            }

            // Call Instancer logistics
            (async () => {
                NotificationInstanceConstructor.PreBuildNotification();
                NotificationInstanceConstructor.SetNotificationCloseTrigger(NotificationInstanceConstructor.notification);
            })().then(async () => {
                let NotificationDeployed = await NotificationInstanceConstructor.DeployNotification();
                if (NotificationDeployed === true) {
                    console.debug(`\nNotification:%c\t${FormatedNotificationMessage()}%c\nWas deployed to interface.`, 'color: yellow;', 'color: default;');
                } else {
                    console.warn(`\nNotification:\t${FormatedNotificationMessage()}\nCouldn't be deployed to interface.`);
                }
            }).finally(() => {
                return;
            });

            if (OptionallyReturnsNotification !== (null || undefined) && typeof(OptionallyReturnsNotification) === "boolean") {
                if (new Boolean(OptionallyReturnsNotification).valueOf() === true) {
                    return NotificationInstanceConstructor !== null ? NotificationInstanceConstructor : null;
                }
            }
        }
    }
}

window.onload = async () => {
    const ListInstancer = new NotificationListUtility.NotificationsListInstancer();
    ListInstancer.ConstructNotificationList();
    ListInstancer.AppendNotificationList(undefined, true);
}

HtWebzEngine.DeployNewNotification = NotificationClient.DeployNewNotification ?? (undefined || null);
