/**
 * @typedef {InstanceNotification} ActionNotification
 */
let InstanceNotification = ActionNotification

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
     * @param {string} NotificationMessage
     * @param {boolean} AutoRemove 
     */
    constructor(NotificationMessage, AutoRemove) {
        /**
         * 
         * @type {String}
         */
        this.removingAutomatically = AutoRemove && new Boolean(AutoRemove).valueOf() || false;
        this.message = new String(NotificationMessage).toString();
        this.notification = null;
    }

    /**
     * 
     * @private
     */
    static NotificationInnerContentsTemplate = `
        <button class="cancel-notification">X</button>
        <span class="notification-message"></span>
    `;

    /**
     * 
     * @returns {void}
     * @public
     */
    async ClientNotify() {
        try {
            console.debug(`%cBuilding Notification Object...`, 'color: yellow;');
            this.notification = document.createElement("div");
            if (this.notification !== null && this.notification instanceof HTMLDivElement) {

            }
            // Apply Notification Message
            if (this.message !== null && typeof(this.message) === "string") {

            } else if (this.message === null || typeof(this.message) !== "string") {
                console.warn(`Notification message was NULL, or invalid.\nExpected type literal:\t${String.name.toString()}`);
            }
        } catch (NotificationFailure) {
            if (NotificationFailure !== null) {
                const NotificationFailureMessage = new String(NotificationFailure).trimStart().valueOf();
                throw new Error(`${NotificationFailureMessage}`);
            }
        } finally {
            return void null;
        }
    }
}

/**
 * 
 * @param 
 * @returns {ActionNotification?}
 */
function DeployNotification() {
    if (ActionNotification !== (null || undefined)) {

    }
}

export {
    InstanceNotification as ActionNotification,
    DeployNotification,
};
