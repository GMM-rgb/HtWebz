// scope_definitions.d.ts
// Use Notification Main Interface exports; for function declaration types.
import * as NotifyUtility from "./notification_system/notification_utility_modules/notification_main_interface";

// Notification System Definitions
declare global {
    interface Window {
        /**
         * ***
         * #### **`RemoveAfter`** Inputted in as __``Seconds``.__
         * ***
         */
        DeployNewNotification: (
            RequestedNotificationMessage: string,
            RemoveAfter?: number|undefined,
            OptionallyReturnsNotification?: boolean|undefined
        ) => NotifyUtility.ActionNotification?;
    }
}

export {};
