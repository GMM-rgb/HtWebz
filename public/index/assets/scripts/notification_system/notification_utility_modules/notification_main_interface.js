/**
 * Container for fixed user interface on the screen; to be appended.
 */
const UserInterfaceFlexBar = document.querySelector(".staticStickyUiFlex");

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
     * @type {string?}
     * @private
     */
    FormatedNotificationClassName = null;
    /**
     * 
     * @param {string} NotificationMessage
     * @param {number} AutoRemovalDuration 
     */
    constructor(NotificationMessage, AutoRemovalDuration) {
        /**
         * 
         * @type {String}
         */
        this.message = new String(NotificationMessage).toString();
        /**
         * 
         * @type {Number}
         */
        this.RemovalTimeout = AutoRemovalDuration !== (null || undefined) && Math.abs(AutoRemovalDuration.valueOf()) > 0 ? Math.abs(new Number(AutoRemovalDuration)) : 0;
        /**
         * 
         * @type {Number}
         */
        this.RemovalCountdown = Math.ceil(new Number(Math.abs(AutoRemovalDuration) * 1000) || 0);
        this.notification = null;
    }

    /**
     * 
     * ---
     * 
     * 
     * 
     * ---
     * 
     * @returns {void}
     * @public
     * 
     * ---
     * 
     */
    TryAttatchAutoRemove() {
        if (this.RemovalTimeout !== (null || undefined) && typeof(this.RemovalTimeout) === "number") {
            let RemovalTimeoutCountdowns = [];
            let TimeoutIntervalIncrement = 1;
            while (this.RemovalCountdown.valueOf() > 0) {
                RemovalTimeoutCountdowns.push(setTimeout(() => {
                    this.RemovalCountdown -= Math.floor(new Number('1' + '0'.repeat(3)));
                }, Math.ceil(this.RemovalTimeout * 1000) * TimeoutIntervalIncrement));
                TimeoutIntervalIncrement += 1;
            }
        }

        return;
    }


    /**
     * Fetches the Notification List Object; to find the Notification requested.
     * 
     * ---
     * 
     * @returns {HTMLElement?}
     * @private
     */
    FetchNotificationListElement() {
        const NotificationList = UserInterfaceFlexBar.querySelector("#UserNotificationListInterface");
        if (NotificationList !== null && NotificationList instanceof HTMLElement) {
            return NotificationList || null;
        }
    }

    /**
     * 
     * ---
     * 
     * Fetches all __SUPPOSED__ _Notification Elements_; from the _Notification List_ interface.
     * 
     * ---
     * 
     * @returns {HTMLElement[]?}
     * @public
     */
    ScanListNotifications() {
        const FetchedNotificationList = this.FetchNotificationListElement();
        const CurrentNotificationsWithinList = FetchedNotificationList.querySelectorAll("div");
        return CurrentNotificationsWithinList !== null && CurrentNotificationsWithinList instanceof NodeList ? CurrentNotificationsWithinList : null;
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
     * @public
     */
    DeconstructNotification() {
        if (this.notification !== null && this.isNotificationValid()) {
            if (UserInterfaceFlexBar !== (undefined || null) && UserInterfaceFlexBar instanceof HTMLElement) {
                const FoundNotificationInList = UserInterfaceFlexBar.querySelector(this.notification.classList.item(0).toString().valueOf());
                if (FoundNotificationInList !== null && FoundNotificationInList instanceof HTMLDivElement) {
                    if (Object.is(FoundNotificationInList.classList.item(0), this.notification.classList.item(0))) {
                        if (Object.hasOwn(FoundNotificationInList, HTMLElement.prototype.remove)) {
                            (async () => {
                                FoundNotificationInList.remove();
                            })().then(() => {
                                console.debug(`%cSuccessfully DECONSTRUCTED Notification.\nNotification:\t${this.message.toString().valueOf()}`, 'color: lime;');
                            });
                        }
                    }
                }
            }
        }
    }

    /**
     * __Pre-Bakes__ the `Notification` under the hood; to be further used.
     * @returns {void}
     * @public
     */
    PreBuildNotification() {
        try {
            console.debug(`%cBuilding Notification Object...`, 'color: magenta;');
            if (this.hasMessageData() === true) {
                this.FormatedNotificationClassName = new String(this.message.replaceAll(" ", "-").toLowerCase());
            } else {
                throw new Error("Whilist pre-building new Notification; the Notification System experienced an Error!\n", {
                    cause: new String(
                        `
                        \nNotification Instancer was not provided a Notification message from the beginning.
                        \nWas Message Data Available?:\t${this.hasMessageData().valueOf()}
                        `.normalize("NFC").trimEnd()
                    )
                });
            }
            // 
            this.notification = document.createElement("div");
            this.notification.setAttribute("class", this.FormatedNotificationClassName.valueOf());

            // The text element for the notification message; to display towards the user
            let NotificationTextSpan = null;

            // Port over base initial Notification Interface
            (async () => {
                if (this.notification !== null && this.notification instanceof HTMLDivElement) {
                    if (this.notification.innerHTML.length.valueOf() <= 0 && NotificationInstancerData.NotificationInnerContentsTemplate !== null) {
                        this.notification.innerHTML = new String(NotificationInstancerData.NotificationInnerContentsTemplate);
                        NotificationTextSpan = this.notification.querySelector("span");
                        if (!(NotificationTextSpan.innerHTML.length > 0)) {
                            NotificationTextSpan.innerHTML = this.message.toString();
                        }
                    }
                }
            })().then(() => {
                console.debug(`%cSuccessfully ported notifcation interface content.`, 'color: magenta;');
            });

            // Apply Notification Message
            if (this.notification !== null && this.notification instanceof HTMLDivElement && this.message !== null && typeof(this.message) === "string") {
                if (NotificationTextSpan !== null && NotificationTextSpan instanceof HTMLSpanElement) {
                    
                }
            } else if (this.message === null || typeof(this.message) !== "string") {
                console.warn(`Notification message was NULL, or invalid.\nExpected type literal:\t${String.name.toString()}`);
            }
        } catch (NotificationFailure) {
            if (NotificationFailure !== null) {
                const NotificationFailureMessage = new String(NotificationFailure).valueOf();
                throw new Error(`${NotificationFailureMessage}`);
            }
        } finally {
            return;
        }
    }

    /**
     * 
     * ---
     * 
     * Deploys the __Notification__ to the __NotificationsList__ `Object`,  
     * to then be displayed to the user.
     * 
     * ---
     * 
     * @returns {boolean}
     * 
     */
    DeployNotification() {
        /**
         * #### Current notifications located within the interface list.
         * @type {HTMLElement[]?}
         */
        let CurrentNotifications = null;
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
                if (this.isNotificationValid() && UserInterfaceFlexBar !== (null || undefined) && UserInterfaceFlexBar instanceof HTMLElement) {
                    const NotificationList = UserInterfaceFlexBar.querySelector("#UserNotificationListInterface");
                    this.notification.classList.add("NotificationDeployed"); // apply deployed classlist to the notification

                    NotificationList.appendChild(this.notification !== null ? this.notification : undefined);
                    CurrentNotifications = this.ScanListNotifications();

                    if (CurrentNotifications !== null) {
                        CurrentNotifications.forEach((CurrentNotification) => {
                            // console.debug(`${CurrentNotification.className}`);
                            NotificationDeploymentSuccessful = CurrentNotification.classList.item(0) === this.message.valueOf()
                            ? true
                            : false;
                        });
                    } else {
                        console.warn("CurrentNotifications could not be fetched.");
                    }
                } else {
                    if (UserInterfaceFlexBar === (null || undefined) || !(UserInterfaceFlexBar instanceof HTMLElement)) {
                        throw new Error(`Could not append Notification.\nReason:\n`, { cause: "UserInterfaceFlexbar was not in acceptable range.".normalize("NFC") });
                    }
                }
            } catch (NotificationDeploymentError) {
                if (NotificationDeploymentError !== null) {
                    console.error(`Deploying Notification "${this.message}", resulted in an Error.\n${new String(NotificationDeploymentError).valueOf().toString()}`);
                }
            }
        }

        return NotificationDeploymentSuccessful !== null ? NotificationDeploymentSuccessful : false;
    }
}

/**
 * @readonly
 * @typedef {InstanceNotification} ActionNotification
 */
let InstanceNotification = UserNotification ? UserNotification : undefined;

// Export Module Classes
export {
    InstanceNotification as ActionNotification,
};
