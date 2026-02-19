const UserArrangmentFlexbox = document.querySelector(".staticStickyUiFlex");
/**
 * Determines that if the `NotificiationList` is constructed; or not in the ___current___ Window Document.
 * @type {boolean}
 */
let DocumentHasNotificationListConstructed = false;

/**
 * 
 */
class NotificationElementHolder {
    static NotificationsActiveStateChanged = new CustomEvent("NotificationsToggle", undefined);
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
        this.NotificationsActive = true;
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
            if (DocumentHasNotificationListConstructed !== true) {
                const NewNotifyList = document.createElement("section");
                NewNotifyList.setAttribute("id", "UserNotificationListInterface");
                // Update `NotificationList` variable to the new created list.
                this.NotificationListElement = NewNotifyList !== null && NewNotifyList instanceof HTMLElement ? NewNotifyList : null;
                this.NotificationListElement = NewNotifyList || null;
                // Turn the Boolean over to opposite of current
                DocumentHasNotificationListConstructed = new Boolean(!!DocumentHasNotificationListConstructed).valueOf();
            }
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
            console.debug(`%cTrying to append %cNotificationList%c...`, 'color: magenta;', 'font-weight: bold; color: magenta;', 'color: magenta;');
            try {
                if (typeof (WillAppend) === "boolean" && WillAppend === true) {
                    if (TargetElementToAppend !== (null || undefined)) {
                        TargetElementToAppend ? TargetElementToAppend.appendChild(this.NotificationListElement) : void null;
                    } else {
                        if (UserArrangmentFlexbox !== null && UserArrangmentFlexbox instanceof HTMLElement) {
                            (async () => {
                                console.info("%cNo specieifed Target HTMLElement to append; was inputted, falling back to default destination.", 'color: orange;');
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

    /**
     * ---
     * 
     * ...
     * 
     * ---
     * 
     * @param {boolean} RequestedNotificationsActive
     * @returns {void}
     */
    SetNotificationEnabledState(RequestedNotificationsActive) {
        if (NotificationsActive !== (null || undefined) && typeof(NotificationsActive) === "boolean") {
            (async () => {
                this.NotificationsActive = new Boolean(RequestedNotificationsActive).valueOf();
                this.NotificationListElement.dispatchEvent(NotificationElementHolder.NotificationsActiveStateChanged);
            })().then(() => {
                console.debug(`%cNotification enabled state has been successfully set!`, 'color: magenta;');
            }).finally(() => {
                return;
            });
        }
    }
}

export {
    NotificationElementHolder as NotificationsListInstancer,
};
