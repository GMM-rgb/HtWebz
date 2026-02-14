// scope_definitions.d.ts
// Import Notification Main Interface file exports; for the Notification System function declaration types.
import * as NotifyUtility from "./assets/scripts/notification_system/notification_utility_modules/notification_main_interface";
// Notification System Definitions
declare global {
    interface Window {
        /**
         * ***
         * #### **`RemoveAfter`** Inputted in as __``Seconds``.__
         * ***
         */
        DeployNewNotification: (RequestedNotificationMessage: string, RemoveAfter?: number|undefined, OptionallyReturnsNotification?: boolean|undefined) => NotifyUtility.ActionNotification?;
    }
}

export {};
