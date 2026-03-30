// Author: Maximus F.
//
// scope_definitions.d.ts
//
// Import Notification Main Interface file exports; for the Notification System function declaration types.
import * as NotifyUtility from "./notification_system/notification_utility_modules/notification_main_interface";
import { Socket } from "socket.io";

declare type VariableReactionEventResult = [...any];

export declare global {
    /**
     * ---
     * ...
     * 
     */
    export declare interface WaitForElementResult<T extends HTMLElement> {
        // `then` promise exception
        then<R1 = T, R2 = never>(
            onfulfilled?: ((value: T) => R1 | PromiseLike<R1>) | null,
            onrejected?: ((reason: unknown) => R2 | PromiseLike<R2>) | null
        ): Promise<R1 | R2>;
        // `catch` promise exception
        catch<R = never>(
            onrejected?: ((reason: unknown) => R | PromiseLike<R>) | null
        ): Promise<T | R>;
        // `finally` promise exception
        finally(
            onfinally?: (() => void) | null
        ): Promise<T>;
    }
}

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
             * ---
             * Waits for an element to appear in the DOM hierarchy tree.
             * 
             * ---
             * @param selector - CSS selector to query for
             * @param {ParentNode} [root=document] - Node to search within      
             */
            waitForElement: <WaitTemplate extends HTMLElement>(
                selector: string,
                root?: ParentNode
            ) => WaitForElementResult<WaitTemplate>;
            /**
             * 
             */
            VariableReactionValid: () => typeof Boolean.prototype;
            /**
             * 
             */
            ObserveVariableReactionEvent: () => VariableReactionEventResult;
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

    export namespace HtWebzEfficencyEngine {
        export interface EasyLoader {
            JavaScriptLoader: {
                InjectJavaScriptObject: (TargetFileName?: string, ExecuteOnLoad: boolean) => {};
            };
        }
    }
}

export {};
