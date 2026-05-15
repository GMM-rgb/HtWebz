// Author: Maximus F.
//
// scope_definitions.d.ts
//
// Import Notification Main Interface file exports; for the Notification System function declaration types.
import { Socket, RemoteSocket } from "socket.io";
import * as NotifyUtility from "./notification_system/notification_utility_modules/notification_main_interface";
import { HtWebzDockWindow } from "./HtWebz_Window_Docker/Window_Docker_TypeScript/window_dock_constructor.ts";
import type { WindowDockPrimative } from "./HtWebz_Window_Docker/Window_Docker_TypeScript/window_docker_system_types/window_dock_objects";
/// <reference path="./HtWebz_Window_Docker/Window_Docker_TypeScript/window_docker_system_types/window_dock_objects.d.ts" />
declare type VariableReactionEventResult = [...any];

declare global {
    /**
     * ---
     * ...
     * 
     */
    interface WaitForElementResult<T extends HTMLElement> {
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

declare global {
    let socket: (typeof Socket.prototype.client.conn.request.socket);
}

declare global {
    var HtWebzAPIs: HtWebzAPIs.HtWebzCore & { HtWebzEngine: HtWebzAPIs.HtWebzEngine };
    var HtWebzUtility: HtWebzAPIs.HtWebzUtility;
    var HtWebzAccountManager: HtWebzAccountManager.AccountServerCommunication;
    var HtWebzEfficencyEngine: HtWebzEfficencyEngine.EasyLoader;
    
    namespace HtWebzAPIs {
        /**
         * ---
         * 
         */
        interface HtWebzCore {

        }

        /**
         * ---
         * 
         */
        interface HtWebzEngine {
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
            /**
             * 
             */
            HtWebzDockWindow: typeof HtWebzDockWindow;
        }

        /**
         * ---
         * 
         */
        interface HtWebzUtility {
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

    namespace HtWebzAccountManager {
        namespace AccountProtocolStreamingTypes {
            type AccountProtocolData = {
                ProtocolDataGroupName: string;
                ProtocolDataGroup: {
                    DataJSON: (Object | JSON | String);
                };
            };
        }

        interface AccountServerCommunication {
            UpdateAccountProtocolDataWith: (NewProtocolData?: any) => {};
        }
    }

    namespace HtWebzEfficencyEngine {
        interface EasyLoader {
            JavaScriptLoader: {
                InjectJavaScriptObject: (TargetFileName?: string, ExecuteOnLoad?: boolean) => void;
            };
        }
    }
}
