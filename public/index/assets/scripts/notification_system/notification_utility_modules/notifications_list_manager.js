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

export {
    NotificationElementHolder as NotificationsListInstancer,
}
