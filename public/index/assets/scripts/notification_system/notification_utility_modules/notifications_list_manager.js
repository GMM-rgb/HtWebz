const UserArrangmentFlexbox = document.querySelector(".staticStickyUiFlex");

/**
 * 
 */
class NotificationElementHolder {
    /**
     * 
     * @param {Boolean} CheckForNotificationListOnChange 
     */
    constructor(CheckForNotificationListOnChange) {
        this.ChecksDocumentVerify = new Boolean(CheckForNotificationListOnChange).valueOf() || false;
        /**
         * @type {HTMLElement?}
         */
        this.NotificationListElement = null;
    }

    /**
     * #### Constructs a new `NotificationList`; for notifications to be appended when needed.
     * 
     * --- 
     * _****NOTE:****_ This should only be called **ONCE** per page load! 
     * 
     * --- 
     * **Example Usage:**
     * ```javascript
     * 
     * ```
     * @returns {void}
     */
    ConstructNotificationList() {
        if (this.NotificationListElement === null || !(this.NotificationListElement instanceof HTMLElement)) {
            const NewNotifyList = document.createElement("section");
            NewNotifyList.setAttribute("id", "UserNotificationListInterface");
            // Update `NotificationList` variable to the new created list.
            this.NotificationListElement = NewNotifyList !== null && NewNotifyList instanceof HTMLElement ? NewNotifyList : null;
            this.NotificationListElement = NewNotifyList || null;
        } else {
            console.warn(`Tried to call ${this.ConstructNotificationList.name.toString()}, when there's already a NotificationList present in the DOM Tree.`);
        }
    }

    /**
     * 
     * ---
     * 
     * Appends the supposed **Constructed** list element for *Notifications*; to the fixed position user interface.
     * 
     * ---
     * 
     * @param {HTMLElement|undefined} TargetElementToAppend 
     * @param {boolean} WillAppend 
     * @returns {void}
     * 
     * ---
     * 
     */
    async AppendNotificationList(TargetElementToAppend, WillAppend) {
        if (this.NotificationListElement !== (null || undefined) && this.NotificationListElement instanceof HTMLElement) {
            console.debug(`%cTrying to append NotificationList...`, 'color: magenta;');
            try {
                if (typeof (WillAppend) === "boolean" && WillAppend === true) {
                    if (TargetElementToAppend !== (null || undefined)) {
                        
                    } else {
                        if (UserArrangmentFlexbox !== null && UserArrangmentFlexbox instanceof HTMLElement) {
                            (async () => {
                                console.info("No specieifed Target HTMLElement to append; was inputted, falling back to default destination.");
                            })().then(() => {
                                UserArrangmentFlexbox.appendChild(this.NotificationListElement);
                            });
                        }
                    }
                }
            } catch (NotificationListAppendingError) {
                if (NotificationListAppendingError !== null) {
                    throw new Error(new String(NotificationListAppendingError).valueOf().trimEnd());
                }
            }
        } else {
            console.warn(`NotificationList constructor variable is not available / invalid.\nNotificationList Data:\t${this.NotificationListElement}`);
        }
    }
}

export {
    NotificationElementHolder as NotificationsListInstancer,
};
