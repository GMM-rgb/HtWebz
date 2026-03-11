// Author: Maximus F.
//
// scope_definitions.d.ts
//
// Import Notification Main Interface file exports; for the Notification System function declaration types.
import { MethodDeclaration } from "typescript";
import * as NotifyUtility from "./notification_system/notification_utility_modules/notification_main_interface";
import { Socket } from "socket.io";

export declare global {
    declare var socket: Readonly<typeof Socket.prototype> = (Socket.prototype) as const;
}

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
             * @name waitForElement
             */
            waitForElement: <WaitTemplate extends HTMLElement>(selector: string, root: ParentNode = Document) => Promise<WaitTemplate>;
        }
    }

    export namespace HtWebzAccountManager {
        export declare namespace AccountProtocolStreamingTypes {
            declare type AccountProtocolData = {
                ProtocolDataGroupName: string;
                ProtocolDataGroup: {
                    DataJSON: (Object | JSON | String);
                };
            };
        }

        export interface AccountServerCommunication {
            UpdateAccountProtocolDataWith: (NewProtocolData?: any) => {};
        }
    }
}
