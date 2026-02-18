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
        <div class="notification-header">
            <label class="notification-label">...</label>
            <button class="cancel-notification"><img width="25" height="25" src="./index/assets/images/x-png-35400.png" /></button>
        </div>
        <!-- Notification Message Text -->
        <span class="notification-message"></span>
    `;
}

/**
 * 
 */
class UserNotification {
    /**
     * 
     * @param {string} NotificationMessage
     * @param {string} NotificationLabelText 
     * @param {number} AutoRemovalDuration
     */
    constructor(NotificationMessage, NotificationLabelText, AutoRemovalDuration) {
        /**
         * 
         * @type {HTMLElement?}
         */
        this.notification = null;
        /**
         * 
         * @type {String}
         */
        this.message = new String(NotificationMessage).toString();
        this.label = new String(NotificationLabelText).toString();
        /**
         * 
         * @type {AudioContext?}
         */
        this.NotificationAudioContext = null;
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
    }

    // Private local variables; only accessible by the process
    /**
     * @type {string?}
     * @private
     */
    FormatedNotificationClassName = null;

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
     * 
     * @param {HTMLElement} TargetNotification 
     * @returns {Promise<void>}
     * @public
     */
    async SetNotificationCloseTrigger(TargetNotification) {
        /**
         * 
         * ---
         * 
         * 
         * 
         * ---
         * 
         * @param {number|undefined} AnimateDuration 
         * @returns {Promise<void>}
         * 
         */
        async function AnimateOutNotification(AnimateDuration) {
            if (AnimateDuration !== (null || undefined)) {

            } else {

            }
        }
        
        // Fetch the cancel notification button
        const TargetNotificationCloseButton = TargetNotification.querySelector(".cancel-notification");
        // Append the click event listener & functionality
        if (TargetNotificationCloseButton !== null && TargetNotificationCloseButton instanceof HTMLButtonElement) {
            if (this.DeconstructNotification !== undefined && typeof(this.DeconstructNotification) === "function") {
                TargetNotificationCloseButton.addEventListener("click", async () => {
                    await AnimateOutNotification().then(() => {
                        this.DeconstructNotification();
                    });
                });
            }
        }
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
     * @private
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
     * ---
     * 
     * @returns {Promise<boolean>}
     */
    async NewAduioContext() {
        this.NotificationAudioContext = new (self.AudioContext || self.webkitAudioContext)();
        if (this.NotificationAudioContext !== (null || undefined) && this.NotificationAudioContext instanceof AudioContext) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 
     * Plays a(n) sound from the `AudioContext` for the __Notification__.
     * 
     * ---
     * 
     */
    async PlayNotificationSound() {
        let AduioContextCreationSuccess = true;

        if (this.NotificationAudioContext === null) {
            AduioContextCreationSuccess = await this.NewAduioContext();
        } else {
            console.debug(`%cAlready has AudioContext within the class constructor.`, 'color: magenta;');
        }

        if (this.NotificationAudioContext !== null && AduioContextCreationSuccess !== null && typeof(AduioContextCreationSuccess) === "boolean" && AduioContextCreationSuccess === true) {

            const SoundFile = await fetch("index/assets/audio/page-forward.wav", /*new Request()*/);
            const SoundArrayBuffer = await SoundFile.arrayBuffer();

            this.NotificationAudioContext.decodeAudioData(SoundArrayBuffer, (Buffering) => {
                if (Buffering !== null && Buffering instanceof AudioBuffer) {

                }
            });

            let SoundBuffer = this.NotificationAudioContext.createBufferSource();
            SoundBuffer.buffer;
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
                console.debug(`%cDeconstructing Notification:\t${this.message.valueOf()}`, 'color: magenta;');

                let NotificationClass = new String();

                this.notification.classList.forEach((ClassName, ClassIndex) => {
                    if (ClassName !== null && typeof(ClassName) === "string" && ClassIndex !== null && typeof(ClassIndex) === "number") {
                        NotificationClass += "." + new String(ClassName).valueOf().trim();
                    }
                });

                const FoundNotificationInList = UserInterfaceFlexBar.querySelector(NotificationClass.length > 0 ? NotificationClass.valueOf() : undefined);

                if (FoundNotificationInList !== null && FoundNotificationInList instanceof HTMLDivElement) {
                    (async () => {
                        FoundNotificationInList.remove();
                    })().then(() => {
                        console.debug(`%cSuccessfully %cDECONSTRUCTED %cNotification.\nNotification's Message:\t${this.message.toString().valueOf()}`, 'color: lime;', 'color: lime; font-weight: bold;', 'color: lime;');
                    });
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

            // Notification Header Label
            const NotificationLabel = this.notification.querySelector(".notification-label");

            /**
             * 
             * 
             * 
             * ---
             * 
             * @returns {void}
             * 
             */
            function ApplyNotificationHeaderLabel(LabelRequest) {
                if (NotificationLabel !== null && NotificationLabel instanceof HTMLLabelElement) {
                    (async () => {
                        NotificationLabel.textContent = new String(LabelRequest).trim();
                    })().then(() => {
                        if (!Object.isSealed(NotificationLabel)) {
                            Object.seal(NotificationLabel);
                        }
                    }).finally(() => {
                        return void null;
                    });
                }
            }
            
            ApplyNotificationHeaderLabel(this.label);
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
