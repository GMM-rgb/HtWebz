/**
 * Container for fixed user interface on the screen; to be appended.
 */
const UserInterfaceFlexBar = document.querySelector(".staticStickyUiFlex");

/**
 * Waits for an element to appear in the DOM.
 * @template {HTMLElement} WaitTemplate
 * @name waitForElement
 * @param {string} selector
 * @param {ParentNode} [root=document]
 * @returns {Promise<WaitTemplate>}
 */
HtWebzUtility.waitForElement = function(selector, root = document) {
    return new Promise(resolve => {
        // Check immediately
        const el = root.querySelector(selector);
        if (el) {
            resolve(/** @type {WaitTemplate} */ (el));
            return;
        }

        // Otherwise wait for it
        const obs = new MutationObserver(() => {
            const el = root.querySelector(selector);
            if (el) {
                obs.disconnect();
                resolve(/** @type {WaitTemplate} */ (el));
            }
        });

        obs.observe(root, { childList: true, subtree: true });
    });
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
        <div class="notification-header">
            <label class="notification-label">...</label>
            <button class="cancel-notification" onmouseenter='setupTooltip(".cancel-notification", "Remove Notification?")'><img width="20" height="20" src="./index/assets/images/x-png-35400.png" /></button>
        </div>
        <!-- Notification Message Text -->
        <span class="notification-message"></span>
    `;
    
    /**
     * 
     * @public
     */
    static NotificationTimelineDividerContents = `
    
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
         * @type {Response?}
         */
        this.SoundFile = null;
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
     * @param {number} LifetimeAge
     * @returns {void}
     */
    CreateTimelineDivider(LifetimeAge) {
        /**
         * 
         * @param  {(string[])} InstancerWarnings 
         */
        function _Generate_TimelineDivider_SummaryWarnings(...InstancerWarnings) {
            if (InstancerWarnings !== null && typeof(InstancerWarnings) === "object") {
                console.groupCollapsed("Notification Timeline Divider Warnings");
                const InstancerWarningEntries = InstancerWarnings.entries() ?? null;
                (async () => {
                    for (let WarningIndex = 0; WarningIndex < InstancerWarnings.length; WarningIndex++) {
                        
                    }
                })().finally(() => {
                    console.groupEnd();
                });
            }
        }

        if (LifetimeAge !== null && typeof(LifetimeAge) === "number") {

        } else {
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
        /**
         * 
         * ---
         * 
         * @type {boolean}
         */
        let AduioContextCreationSuccess = true;

        if (this.NotificationAudioContext === null) {
            AduioContextCreationSuccess = await this.NewAduioContext();
        } else {
            console.debug(`%cAlready has AudioContext within the class constructor.`, 'color: magenta;');
        }

        if (this.NotificationAudioContext !== null && AduioContextCreationSuccess !== null && typeof(AduioContextCreationSuccess) === "boolean" && AduioContextCreationSuccess === true) {
            /**
             * 
             * ---
             * 
             * @type {AudioBuffer?}
             */
            let SoundBuffer = null;

            let SoundArrayBuffer;
            if (!this.SoundFile || !(this.SoundFile instanceof globalThis.Response)) {
                this.SoundFile = await fetch("index/assets/audio/page-forward.wav", /*new Request()*/).then((file) => {
                    console.debug("%cFetched Notification Audio.", 'color: lime;');
                    return file;
                }).finally(async () => {
                    console.debug("Set Sound File Variable.");
                });
            }

            SoundArrayBuffer = await this.SoundFile.arrayBuffer();

            this.NotificationAudioContext.decodeAudioData(SoundArrayBuffer, (Buffering) => {
                if (Buffering !== null && Buffering instanceof AudioBuffer) {
                    return SoundBuffer = Buffering;
                }
            }).then(async (AudioBuffer) => {
                SoundBuffer = AudioBuffer;

                let SoundBufferSource = this.NotificationAudioContext.createBufferSource();
                SoundBufferSource.buffer = SoundBuffer;
                SoundBufferSource.connect(this.NotificationAudioContext.destination);
                SoundBufferSource.start(0);
                if (this.NotificationAudioContext.state === ("interrupted" || "suspended")) {
                    await this.NotificationAudioContext.resume()
                    .catch((ResumeNotificationEffectError) => {
                        if (ResumeNotificationEffectError !== null) {
                            console.error(`There was an %cError trying to play notification sound; uh-ohs!\n${new String(ResumeNotificationEffectError).toString()}`, 'font-weight: bolder;');
                        }
                    }).finally(() => {
                        return void null;
                    });
                }
            });
        }
    }

    /**
     * 
     * @returns {void}
     * @public
     */
    DeconstructNotification() {
        if (!this.notification || !this.isNotificationValid()) return;
        if (!(UserInterfaceFlexBar instanceof HTMLElement)) return;

        console.debug(`%cDeconstructing Notification:\t${this.message}`, 'color: magenta;');

        this.notification.remove();

        console.debug(
            `%cSuccessfully %cDECONSTRUCTED %cNotification.\nNotification's Message:\t${this.message}`,
            'color: lime;',
            'color: lime; font-weight: bold;',
            'color: lime;'
        );
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
     * @returns {Promise<boolean>}
     * 
     */
    async DeployNotification() {
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
         * 
         * @type {boolean}
         */
        let NotificationDeploymentSuccessful = false;
        /**
         * 
         * ---
         * 
         * @type {boolean}
         */
        let NotificationHeaderContentsExist = false;

        if (UserNotification !== (null || undefined)) {
            try {
                if (this.isNotificationValid() && UserInterfaceFlexBar !== (null || undefined) && UserInterfaceFlexBar instanceof HTMLElement) {
                    const NotificationList = UserInterfaceFlexBar.querySelector("#UserNotificationListInterface");
                    this.notification.classList.add("NotificationDeployed"); // apply deployed classlist to the notification

                    return HtWebzUtility.waitForElement("#UserNotificationListInterface", UserInterfaceFlexBar).then(NotifyList => {
                        // Create a safe class ONCE
                        const safeClass = this.message
                            .toLowerCase()
                            .trim()
                            .replace(/[^a-z0-9_-]/gi, "-");

                        // Add ONLY the safe class
                        this.notification.classList.add(this.safeClass);

                        // Deploy notification
                        NotifyList.appendChild(this.notification);

                        // Deployment success check
                        NotificationDeploymentSuccessful =
                            this.notification.classList.contains("NotificationDeployed");

                        // Scan notifications (clean version)
                        CurrentNotifications = Array.from(NotifyList.children)
                            .filter(node => node instanceof HTMLDivElement);
                        
                        // Expierimental removed for now.
                        // if (CurrentNotifications !== null) {
                        //     CurrentNotifications.forEach((CurrentNotification) => {
                        //         if (CurrentNotification !== null && CurrentNotification instanceof HTMLDivElement) {
                        //             if (Object.hasOwn(CurrentNotification, HTMLDivElement.prototype.hasChildNodes) && CurrentNotification.hasChildNodes() === true) {
                        //                 // Fetch the CurrentNotification node element children
                        //                 let HeaderElementData = CurrentNotification.childNodes.entries();
                        //                 let isHeaderElementsValid = new Boolean(false).valueOf();

                        //                 // Verify the node children are the actaul corresponding elements
                        //                 for (let CurrentElementIndex = 0; CurrentElementIndex < CurrentNotification.children.length; CurrentElementIndex++) {
                        //                     const IndexProperFormat = new Number(Math.floor(CurrentElementIndex - 1)).valueOf();
                        //                     console.debug(`%cHeaderElementData:\n\t${new String(HeaderElementData[0]).valueOf()}\n\t${new String(HeaderElementData[1]).valueOf()}`, 'color: magenta; font-weight: normal;');

                        //                     try {
                        //                         if (CurrentNotification.children.item(IndexProperFormat) instanceof HTMLDivElement) {
                        //                             const OriginalChildElementRoot = CurrentNotification.children.item(IndexProperFormat).getRootNode();
                        //                             if (HeaderElementData !== (null || undefined) && new Number(HeaderElementData[0]).valueOf() === IndexProperFormat) {
                        //                                 if (OriginalChildElementRoot !== null && OriginalChildElementRoot instanceof Node && OriginalChildElementRoot === HeaderElementData[IndexProperFormat]) {
                        //                                     isHeaderElementsValid = true;
                        //                                 } else {
                        //                                     isHeaderElementsValid = false;
                        //                                 }
                        //                             }
                        //                         }
                        //                     } catch (HeaderElementDataScanError) {
                        //                         console.error(`${new String(HeaderElementDataScanError).toString()}`);
                        //                     }

                        //                     // Update Array to the next __Iterator__
                        //                     HeaderElementData = HeaderElementData.next().value || null;
                        //                 }
                        //             }
                        //         }
                        //     });
                        // } else {
                        //     console.warn("CurrentNotifications could not be fetched.");
                        // }
                        return true;
                    }).catch(err => {
                        console.error("Notification deployment failed:", err);
                        return false;
                    });
                } else {
                    if (UserInterfaceFlexBar === (null || undefined) || !(UserInterfaceFlexBar instanceof HTMLElement)) {
                        throw new Error(`Could not append Notification.\nReason:\n`, { cause: "UserInterfaceFlexbar was not in acceptable range.".normalize("NFC") });
                    }
                }
            } catch (NotificationDeploymentError) {
                if (NotificationDeploymentError !== null) {
                    console.error(`Deploying Notification "${this.message}", resulted in an Error.\n${new String(NotificationDeploymentError).valueOf().toString()}`);
                    return false;
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
