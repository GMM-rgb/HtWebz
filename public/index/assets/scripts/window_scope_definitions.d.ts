// Author: Maximus F.
//
// scope_definitions.d.ts
//
// Import Notification Main Interface file exports; for the Notification System function declaration types.
import * as NotifyUtility from "./notification_system/notification_utility_modules/notification_main_interface";

declare type WaitTemplate = HTMLElement;

export declare global {
    /**
     * ---
     * 
     */
    export interface HtWebzEngine {
        /**
         * 
         * @param RequestedNotificationMessage 
         * @param NotificationHeaderLabel 
         * @param RemoveAfter 
         * @param OptionallyReturnsNotification 
         * @returns 
         */
        DeployNewNotification: (RequestedNotificationMessage: string, NotificationHeaderLabel: string, RemoveAfter?: number, OptionallyReturnsNotification?: boolean) => (typeof NotifyUtility.ActionNotification | undefined);
        /**
         * 
         * @param RequestedDebugMessage 
         * @returns 
         */
        debug: (RequestedDebugMessage?: string[]) => {};
    }
    
    /**
     * ---
     * 
     */
    export interface HtWebzUtility {
        /**
         * 
         * @param selector 
         * @param root
         * @returns 
         */
        waitForElement: (selector: string, root:ParentNode=Document) => Promise<WaitTemplate>;
    }

    /**
     * ---
     * 
     */
    export interface HtWebzCore {
        
    }
}

export {};
