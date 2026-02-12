/**
 * @typedef {InstanceNotification} ActionNotification
 */
let InstanceNotification = ActionNotification;

/**
 * 
 */
class NotificationElementHolder {

}

/**
 * 
 */
class NotificationProcessInstancer {
    static newNotificationObject() {

    }
}

/**
 * 
 */
class ActionNotification {
    /**
     * 
     * @param {String} NotificationMessage 
     * @param {Boolean} AutoRemove 
     * @param {Number} WillAutoRemoveAfter
     */
    constructor(NotificationMessage, AutoRemove, WillAutoRemoveAfter) {
        /**
         * 
         * @type {String}
         */
        this.removingAutomatically = AutoRemove && new Boolean(AutoRemove).valueOf() || false;
        this.duration = new Number(WillAutoRemoveAfter).valueOf() || 0;
        this.message = new String(NotificationMessage).toString();
        this.notification = null;
    }

    /**
     * @private
     */
    static NotificationInnerContentsTemplate = `
        <button class="cancel-notification">X</button>
        <span class="notification-message">...</span>
    `;

    /**
     * @returns {Promise<void>}
     * @public
     */
    async trigger() {
        try {
            console.debug(`%cBuilding Notification Object...`, 'color: yellow;');
            this.notification = document.createElement("div");

            if (this.notification !== null && this.notification instanceof HTMLDivElement) {
                // TODO: apply classes, innerHTML, etc.
            }

            // Apply Notification Message
            if (this.message !== null && typeof this.message === "string") {
                // TODO: insert message into template
            } else {
                console.warn(
                    `Notification message was NULL, or invalid.\nExpected type literal:\t${String.name.toString()}`
                );
            }
        } catch (NotificationFailure) {
            if (NotificationFailure !== null) {
                const NotificationFailureMessage = new String(NotificationFailure)
                    .trimStart()
                    .valueOf();
                throw new Error(`${NotificationFailureMessage}`);
            }
        } finally {
            return void null;
        }
    }
}

/**
 * 
 * @param {string} Message
 * @param {number} ShowDurationAmount 
 * @returns {ActionNotification?}
 */
function DeployNotification(Message, ShowDurationAmount) {
    if (ActionNotification !== (null || undefined)) {
        // TODO: instantiate and return a notification
        (async () => {
            const NewNotificationInstancer = new ActionNotification(new String(Message).valueOf());
            const Notification = await NewNotificationInstancer.trigger();
            console.info(`%cDisplaying Notification:\t${NewNotificationInstancer.message}`, 'color: lime;');
        })();
    }
}

export {
    InstanceNotification as ActionNotification,
    DeployNotification,
};
