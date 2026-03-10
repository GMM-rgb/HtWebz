// Author: Maximus F.
//
// scope_definitions.d.ts
//
// Import Notification Main Interface file exports; for the Notification System function declaration types.
import * as NotifyUtility from "./notification_system/notification_utility_modules/notification_main_interface";

export declare global {
    export declare namespace HtWebzAPIs {
        /**
         * ---
         * 
         */
        export declare interface HtWebzCore {
            
        }

        /**
         * ---
         * 
         */
        export declare interface HtWebzEngine {
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
        export declare interface HtWebzUtility {
            /**
             * Waits for an element to appear in the DOM.
             * @template {HTMLElement} WaitTemplate
             * @name waitForElement
             * @param {string} selector
             * @param {ParentNode} [root=document]
             * @returns {Promise<WaitTemplate>}
             */

            waitForElement: <WaitTemplate extends HTMLElement>(selector: string, root:ParentNode=Document) => Promise<WaitTemplate>;
        }
    }
}

export {};
