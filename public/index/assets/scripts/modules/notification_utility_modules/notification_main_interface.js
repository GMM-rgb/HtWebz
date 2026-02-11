/**
 * 
 */
class NotificationElementHolder {

}

/**
 * 
 */
class NotificationInstanceBuilder {
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
        this.message = new String(NotificationMessage).toString();
        this.removingAutomatically = AutoRemove && new Boolean(AutoRemove).valueOf() || false;
    }

    async notify() {
        try {

        } catch (NotificationFailure) {
            if (NotificationFailure !== null) {
                const NotificationFailureMessage = new String(NotificationFailure).trimStart().valueOf();
                throw new Error(`${NotificationFailureMessage}`);
            }
        }
        if (this.message !== null && typeof(this.message) === "string") {

        } else if (this.message === null || typeof(this.message) !== "string") {
            console.warn(`Notification message was NULL, or invalid.\nExpected type literal:\t${String.name.toString()}`);
        }
    }
}

export {
    ActionNotification
};
