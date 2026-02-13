// scope_definitions.d.ts
//
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
        DeployNewNotification: (RequestedNotificationMessage: string, RemoveAfter?: number|undefined, OptionallyReturnsNotification?: boolean|undefined) => void;
    }
}



export {};
