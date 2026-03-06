// scope_definitions.d.ts
//
// Import Notification Main Interface file exports; for the Notification System function declaration types.
import * as NotifyUtility from "./notification_system/notification_utility_modules/notification_main_interface";

export declare global {
    export interface HtWebzEngine {
        DeployNewNotification: (RequestedNotificationMessage: string, NotificationHeaderLabel: string, RemoveAfter?: number, OptionallyReturnsNotification?: boolean) => (typeof NotifyUtility.ActionNotification | undefined);
        debug: (RequestedDebugMessage?: string[]) => {};
    }
}

export {};
