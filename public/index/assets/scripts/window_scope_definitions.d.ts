// scope_definitions.d.ts
//

import * as NotifyUtility from "./notification_system/notification_utility_modules/notification_main_interface";

// Notification System Definitions
declare global {
    interface Window {
        // /**
        //  * 
        //  * @param {string} RequestedNotificationMessage
        //  * @param {number|undefined} RemoveAfter Interval in __`Seconds`__
        //  * @returns {void}
        //  */
        /**
         * 
         * ***
         * @param RequestedNotificationMessage 
         * @param RemoveAfter
         * ***
         * #### **`RemoveAfter`** Inputted in as __``Seconds``.__
         * ***
         */
        DeployNewNotification: (RequestedNotificationMessage: string, RemoveAfter?: number|undefined, OptionallyReturnsNotification?: boolean|undefined) => NotifyUtility.ActionNotification?;
    }
}



export {};
