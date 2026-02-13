/**
 * Container for fixed user interface on the screen; to be appended.
 */
const UserInterfaceFlexBar = document.querySelector(".staticStickyUiFlex");

/**
 * 
 */
class NotificationElementHolder {
    /**
     * 
     * @type {HTMLElement?}
     */
    NotificationList = null;

    /**
     * 
     * @param {Boolean} CheckForNotificationListOnChange 
     */
    constructor(CheckForNotificationListOnChange) {
        this.ChecksDocumentVerify = new Boolean(CheckForNotificationListOnChange).valueOf() || false;
    }

    /**
     * #### Constructs a new `NotificationList`; for notifications to be appended when needed.
     * 
     * --- 
     * _****NOTE:****_ This should only be called **ONCE!**
     * 
     * --- 
     * **Example Usage:**
     * ```javascript
     * 
     * ```
     * @returns {void}
     */
    ConstructNotificationList() {
        if (this.NotificationList === null || !(this.NotificationList instanceof HTMLElement)) {
            const NewNotifyList = document.createElement("section");
            // Update `NotificationList` variable to the new created list.
            this.NotificationList = NewNotifyList !== null && NewNotifyList instanceof HTMLElement ? NewNotifyList : null;
        } else {
            console.warn(`Tried to call ${this.ConstructNotificationList.name.toString()}, when there's already a NotificationList present in the DOM Tree.`);
        }
    }
}

/**
 * 
 */
class NotificationInstancerData {
    /**
     * 
     * @public
     */
    static NotificationInnerContentsTemplate = `
        <span class="notification-message"></span>
        <button class="cancel-notification">X</button>
    `;
}

/**
 * 
 */
class UserNotification {
    /**
     * 
     * @param {string} NotificationMessage
     */
    constructor(NotificationMessage) {
        /**
         * 
         * @type {String}
         */
        this.message = new String(NotificationMessage).toString();
        this.notification = null;
    }

    /**
     * ---
     *   
     * Checks that the *Notification* was created as the correct __`HTMLElement`__,
     * and verifies that the *Notification* is not undefined / null. 
     *   
     * ---
     * ---
     *   
     * ### ____Example Usage____
     * ```javascript
     * const NewClientNotificationInstancer = new UserNotification("hello world! :D", false);
     * NewClientNotificationInstancer.PreBuildNotification();
     * // This will log that "Notification" is valid format
     * console.log(`${NewClientNotificationInstancer.isNotificationValid().valueOf()}`);
     * ```
     *   
     * ---
     * @returns {boolean}
     * @public
     */
    isNotificationValid() {
        if (this.notification !== (null || undefined)) {
            return this.notification instanceof HTMLDivElement ? true : false;
        } else {
            return false;
        }
    }

    /**
     * 
     * @returns {boolean}
     * @public
     */
    hasMessageData() {
        console.debug("%cChecking if Notification has message data...", 'color: magenta;');
        // Fetch the Notification message in its current state
        const MessageDataWhenChecking = this.message;
        // 
        if (MessageDataWhenChecking !== null && typeof(MessageDataWhenChecking) === "string") {
            console.info(`%cNotification has message data.`, 'color: lime;');
            return true;
        } else {
            console.warn(`Notification doesn't have any sort of message data!`);
            return false;
        }
    }

    /**
     * 
     * @returns {void}
     */
    DeconstructNotification() {
        if (this.notification !== null && this.isNotificationValid()) {

        }
    }

    /**
     * 
     * @returns {Promise<void>}
     * @public
     */
    async PreBuildNotification() {
        try {
            if (NotificationElementHolder.NotificationList !== null && NotificationElementHolder.NotificationList instanceof HTMLElement) {
                console.debug(`%cBuilding Notification Object...`, 'color: yellow;');
                this.notification = document.createElement("div");

                // The text element for the notification message; to display towards the user
                let NotificationTextSpan = null;

                // Port over base initial Notification Interface
                if (this.notification !== null && this.notification instanceof HTMLDivElement) {
                    if (this.notification.innerHTML.length.valueOf() <= 0 && NotificationInstancerData.NotificationInnerContentsTemplate !== null) {
                        this.notification.innerHTML = new String(NotificationInstancerData.NotificationInnerContentsTemplate);
                        NotificationTextSpan = this.notification.firstChild;
                    }
                }

                // Apply Notification Message
                if (this.notification !== null && this.notification instanceof HTMLDivElement && this.message !== null && typeof(this.message) === "string") {
                    if (NotificationTextSpan !== null && NotificationTextSpan instanceof HTMLSpanElement) {
                        
                    }
                } else if (this.message === null || typeof(this.message) !== "string") {
                    console.warn(`Notification message was NULL, or invalid.\nExpected type literal:\t${String.name.toString()}`);
                }
            } else {
                throw new Error("NotificationList was not found within the DOM Element Hierarchy.\nConsider running the function needed; to construct it automatically.");
            }
        } catch (NotificationFailure) {
            if (NotificationFailure !== null) {
                const NotificationFailureMessage = new String(NotificationFailure).valueOf();
                throw new Error(`${NotificationFailureMessage}`);
            }
        } finally {
            return void null;
        }
    }

    /**
     * 
     * @returns {boolean}
     */
    DeployNotification() {
        /**
         * 
         * ---
         * Determines if the **`Notification`** was deployed successfully or not.
         * 
         * ---
         * _`@type {boolean}`_
         */
        let NotificationDeploymentSuccessful = false;

        if (UserNotification !== (null || undefined)) {
            try {
                if (this.isNotificationValid() && UserInterfaceFlexBar !== null && UserInterfaceFlexBar instanceof HTMLElement) {
                    UserInterfaceFlexBar.appendChild(this.notification !== null ? this.notification : undefined);
                }
            } catch (NotificationDeploymentError) {
                console.error(`Deploying Notification "${this.message}", resulted in an Error.\n${new String(NotificationDeploymentError).valueOf()}`);
            }
        }

        return NotificationDeploymentSuccessful !== null ? NotificationDeploymentSuccessful : false;
    }
}

/**
 * @readonly
 * @typedef {InstanceNotification} ActionNotification
 */
let InstanceNotification = UserNotification || undefined;

// Export Module Classes
export {
    InstanceNotification as ActionNotification
};
