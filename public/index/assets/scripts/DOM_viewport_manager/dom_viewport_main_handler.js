import { add } from "@tensorflow/tfjs";

document.documentElement.get
var CurrentWindowHeight = self.innerHeight || 0;
/**
 * WindowListener Handler Defintion Class
*/
export class WindowListener {
    static WindowHeight = CurrentWindowHeight;
    /**
     * Updates the Minimum Height CSS variable; from the current window inner-height.
     * @returns {number?}
     */
    static UpdateWindowHeight() {
        var NewWindowHeight;
        //
        if ("self" in window && self !== null) {
            if (self.innerHeight !== null) {
                NewWindowHeight = self.innerHeight
            } else {
                console.warn();
            }
        }
        //
        if (NewWindowHeight === null || NewWindowHeight <= 0) return null;
        return NewWindowHeight;
    }
    /**
     * @param {number} NewMinHeight
     * @returns {void}
     */
    static UpdateCSS_Min_Height_Variable(NewMinHeight) {
        if (NewMinHeight !== null && (NewMinHeight instanceof Number)) {
            
        } else {
            console.warn(`${this.name.toString()}: `);
            return;
        }
    }
    /**
     * 
     * @param {"Resize" | "Scroll"} WindowAttributeToListen
     * @returns {(EventListenerObject & Event & string) | null}
     */
    static AttatchAutoWindowListener(WindowAttributeToListen) {
        WindowAttributeToListen = WindowAttributeToListen.toLowerCase();
        //
        /**
         * @type {EventListenerObject?}
         */
        var AttatchedWindowListener = null;
        /**
         * @type {Event?}
         */
        var EventObject = null;
        //
        if (WindowAttributeToListen !== null && (WindowAttributeToListen instanceof String)) {
            const RequestedEventAttribute = new Event(WindowAttributeToListen.toString(), function() {
                if ("self" in window && self !== null) {
                    WindowListener.WindowHeight = self.innerHeight;
                }
            });
            //
            if (RequestedEventAttribute !== null && (RequestedEventAttribute instanceof Event)) {
                EventObject = RequestedEventAttribute;
                self.addEventListener(RequestedEventAttribute);
            }
        }
        return (AttatchedWindowListener, EventObject, WindowAttributeToListen);
    }
}
