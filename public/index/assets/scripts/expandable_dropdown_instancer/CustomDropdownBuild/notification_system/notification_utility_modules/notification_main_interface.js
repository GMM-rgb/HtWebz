const UserInterfaceFlexBar = document.querySelector(".staticStickyUiFlex");
class NotificationInstancerData {
    static NotificationInnerContentsTemplate = `
        <div class="notification-header">
            <label class="notification-label">...</label>
            <button class="cancel-notification"><img width="20" height="20" src="./index/assets/images/x-png-35400.png" /></button>
        </div>
        <!-- Notification Message Text -->
        <span class="notification-message"></span>
    `;
    static NotificationTimelineDividerContents = `
    
    `;
}
class UserNotification {
    constructor(NotificationMessage, NotificationLabelText, AutoRemovalDuration) {
        this.ListeningForTooltip = false;
        this.notification = null;
        this.message = new String(NotificationMessage).toString();
        this.label = new String(NotificationLabelText).toString();
        this.NotificationAudioContext = null;
        this.SoundFile = null;
        this.RemovalTimeout = AutoRemovalDuration !== (null || undefined) && Math.abs(AutoRemovalDuration.valueOf()) > 0 ? Math.abs(new Number(AutoRemovalDuration)) : 0;
        this.RemovalCountdown = Math.ceil(new Number(Math.abs(AutoRemovalDuration) * 1000) || 0);
        this.CancelNotificationBtn = null;
    }
    FormatedNotificationClassName = null;
    TryAttatchAutoRemove() {
        if (this.RemovalTimeout !== (null || undefined) && typeof (this.RemovalTimeout) === "number") {
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
    async SetNotificationCloseTrigger(TargetNotification = undefined) {
        if ((TargetNotification !== undefined && TargetNotification instanceof HTMLElement) && Object.entries(TargetNotification) !== null) {
            async function AnimateOutNotification(AnimateDuration) {
                if (AnimateDuration !== (null || undefined)) {
                }
                else {
                }
            }
            const TargetNotificationCloseButton = await HtWebzAPIs.HtWebzUtility.waitForElement(".cancel-notification", TargetNotification);
            if (TargetNotificationCloseButton !== null && TargetNotificationCloseButton instanceof HTMLButtonElement) {
                if (this.DeconstructNotification !== undefined && typeof (this.DeconstructNotification) === "function") {
                    TargetNotificationCloseButton.addEventListener("click", async () => {
                        this.DeconstructNotification?.();
                    });
                }
            }
        }
        else {
            console.groupCollapsed("NotificationInterface");
            console.error(`TargetNotification for setting close trigger event; NULL value!\nVALUE:\t${String(TargetNotification).toString()}`);
            console.groupEnd();
        }
    }
    FetchNotificationListElement() {
        const NotificationList = UserInterfaceFlexBar.querySelector("#UserNotificationListInterface");
        if (NotificationList !== null && NotificationList instanceof HTMLElement) {
            return NotificationList || null;
        }
    }
    ScanListNotifications() {
        const FetchedNotificationList = this.FetchNotificationListElement();
        const CurrentNotificationsWithinList = FetchedNotificationList.querySelectorAll("div");
        return CurrentNotificationsWithinList !== null && CurrentNotificationsWithinList instanceof NodeList ? CurrentNotificationsWithinList : null;
    }
    isNotificationValid() {
        if (this.notification !== (null || undefined)) {
            return this.notification instanceof HTMLDivElement ? true : false;
        }
        else {
            return false;
        }
    }
    CreateTimelineDivider(LifetimeAge) {
        function _Generate_TimelineDivider_SummaryWarnings(...InstancerWarnings) {
            if (InstancerWarnings !== null && typeof (InstancerWarnings) === "object") {
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
        if (LifetimeAge !== null && typeof (LifetimeAge) === "number") {
        }
        else {
        }
    }
    hasMessageData() {
        console.debug("%cChecking if Notification has message data...", 'color: magenta;');
        const MessageDataWhenChecking = this.message;
        if (MessageDataWhenChecking !== null && typeof (MessageDataWhenChecking) === "string") {
            console.info(`%cNotification has message data.`, 'color: lime;');
            return true;
        }
        else {
            console.warn(`Notification doesn't have any sort of message data!`);
            return false;
        }
    }
    async NewAduioContext() {
        this.NotificationAudioContext = new (self.AudioContext || self.webkitAudioContext)();
        if (this.NotificationAudioContext !== (null || undefined) && this.NotificationAudioContext instanceof AudioContext) {
            return true;
        }
        else {
            return false;
        }
    }
    async PlayNotificationSound() {
        let AduioContextCreationSuccess = true;
        if (this.NotificationAudioContext === null) {
            AduioContextCreationSuccess = await this.NewAduioContext();
        }
        else {
            console.debug(`%cAlready has AudioContext within the class constructor.`, 'color: magenta;');
        }
        if (this.NotificationAudioContext !== null && AduioContextCreationSuccess !== null && typeof (AduioContextCreationSuccess) === "boolean" && AduioContextCreationSuccess === true) {
            let SoundBuffer = null;
            let SoundArrayBuffer = null;
            if (!this.SoundFile || !(this.SoundFile instanceof globalThis.Response)) {
                this.SoundFile = await fetch("index/assets/audio/page-forward.wav").then((file) => {
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
    DeconstructNotification() {
        if (!this.notification || !this.isNotificationValid())
            return;
        if (!(UserInterfaceFlexBar instanceof HTMLElement))
            return;
        console.debug(`%cDeconstructing Notification:\t${this.message}`, 'color: magenta;');
        this.notification.remove();
        console.debug(`%cSuccessfully %cDECONSTRUCTED %cNotification.\nMessage:\t${this.message}`, 'color: lime;', 'color: lime; font-weight: bold;', 'color: lime;');
    }
    PreBuildNotification() {
        try {
            HtWebzAPIs.HtWebzUtility.waitForElement("body", window.document).then(() => {
                console.debug(`%cBuilding Notification Object...`, 'color: magenta;');
                if (this.hasMessageData() === true) {
                    this.FormatedNotificationClassName = new String(this.message.replaceAll(" ", "-").toLowerCase());
                    this.safeClass = this.message
                        .toLowerCase()
                        .replace(/[^a-z0-9_-]/gi, "-")
                        .replace(/^-+|-+$/g, "")
                        .trim();
                }
                else {
                    throw new Error("Whilist pre-building new Notification; the Notification System experienced an Error!\n", {
                        cause: new String(`
                    \nNotification Instancer was not provided a Notification message from the beginning.
                    \nWas Message Data Available?:\t${this.hasMessageData().valueOf()}`).normalize("NFC").trimEnd()
                    });
                }
                this.notification = document.createElement("div");
                this.notification.setAttribute("class", this.safeClass.valueOf());
                let NotificationTextSpan = null;
                (async () => {
                    if (this.notification !== null && this.notification instanceof HTMLDivElement) {
                        if (this.notification.innerHTML.length.valueOf() <= 0 && NotificationInstancerData.NotificationInnerContentsTemplate !== null) {
                            this.notification.innerHTML = new String(NotificationInstancerData.NotificationInnerContentsTemplate);
                            NotificationTextSpan = this.notification.querySelector("span");
                            if (!(Math.ceil(NotificationTextSpan.innerHTML.length) > 0) || NotificationTextSpan.textContent.length <= 0) {
                                NotificationTextSpan.innerHTML = this.message.toString();
                            }
                        }
                    }
                })().then(() => {
                    console.debug(`%cSuccessfully ported notifcation interface content.`, 'color: magenta;');
                }).finally(async () => {
                    await HtWebzAPIs.HtWebzUtility.waitForElement(".cancel-notification", document).then((CancelNotifiationElement) => {
                        this.CancelNotificationBtn = CancelNotifiationElement instanceof HTMLElement ? CancelNotifiationElement : null;
                        if (this.CancelNotificationBtn !== null && this.CancelNotificationBtn instanceof HTMLButtonElement) {
                            if (this.ListeningForTooltip !== true) {
                                console.debug(this.safeClass.toString());
                                this.CancelNotificationBtn.addEventListener("mouseenter", () => {
                                    setupTooltip(`.${this.safeClass.trim()} .notification-header .cancel-notification`, "Delete notification?").then(() => {
                                        console.debug("Notification Cancel Tooltip Triggered.");
                                    });
                                });
                                if (!this.ListeningForTooltip) {
                                    this.ListeningForTooltip = true;
                                }
                            }
                            else {
                                self.console.warn(`\nTooltip for notification already exists!\nNotification Content:\t${this.hasMessageData() ? this.message : "(empty)"}`);
                            }
                        }
                    }).finally(() => {
                        console.debug("Added Tooltip to pre-constructed notification.");
                    });
                });
                const NotificationLabel = this.notification.querySelector(".notification-label");
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
                this.SetNotificationCloseTrigger(this.notification);
            });
        }
        catch (NotificationFailure) {
            if (NotificationFailure !== null) {
                const NotificationFailureMessage = new String(NotificationFailure).valueOf();
                throw new Error(`${NotificationFailureMessage}`);
            }
        }
        finally {
            return;
        }
    }
    async DeployNotification() {
        let CurrentNotifications = null;
        let NotificationDeploymentSuccessful = false;
        let NotificationHeaderContentsExist = false;
        if (UserNotification !== (null || undefined)) {
            try {
                if (this.isNotificationValid() && UserInterfaceFlexBar !== (null || undefined) && UserInterfaceFlexBar instanceof HTMLElement) {
                    const NotificationList = UserInterfaceFlexBar.querySelector("#UserNotificationListInterface");
                    this.notification.classList.add("NotificationDeployed");
                    return HtWebzAPIs.HtWebzUtility.waitForElement("#UserNotificationListInterface", UserInterfaceFlexBar).then(NotifyList => {
                        this.notification.classList.add(this.safeClass);
                        NotifyList.appendChild(this.notification);
                        NotificationDeploymentSuccessful =
                            this.notification.classList.contains("NotificationDeployed");
                        CurrentNotifications = Array.from(NotifyList.children)
                            .filter(node => node instanceof HTMLDivElement);
                        return true;
                    }).catch(err => {
                        console.error("Notification deployment failed:", err);
                        return false;
                    });
                }
                else {
                    if (UserInterfaceFlexBar === (null || undefined) || !(UserInterfaceFlexBar instanceof HTMLElement)) {
                        throw new Error(`Could not append Notification.\nReason:\n`, { cause: "UserInterfaceFlexbar was not in acceptable range.".normalize("NFC") });
                    }
                }
            }
            catch (NotificationDeploymentError) {
                if (NotificationDeploymentError !== null) {
                    console.error(`Deploying Notification "${this.message}", resulted in an Error.\n${new String(NotificationDeploymentError).valueOf().toString()}`);
                    return false;
                }
            }
        }
        return NotificationDeploymentSuccessful !== null ? NotificationDeploymentSuccessful : false;
    }
}
let InstanceNotification = UserNotification ? UserNotification : undefined;
export { InstanceNotification as ActionNotification, };
//# sourceMappingURL=notification_main_interface.js.map