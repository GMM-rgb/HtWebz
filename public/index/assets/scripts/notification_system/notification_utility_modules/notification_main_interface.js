/**
 * 
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

// 

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
     * @returns {Promise<void>}
     * @public
     */
    async BuildNotification() {
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

/**
 * @typedef {InstanceNotification} ActionNotification
 */
let InstanceNotification = ActionNotification

export {
    InstanceNotification as ActionNotification,
    DeployNotification,
};
