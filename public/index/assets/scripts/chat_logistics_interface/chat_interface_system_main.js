/**
 * @fileoverview
 * The MAIN file for the chat interface managment.
 */
// 
import * as ChatMessageUtility from "./chat_message_utility";
/**
 * 
 */
class ChatNewDataObservers {
    /**
     * 
     * @readonly
     */
    static DocumentChange = new MutationObserver((MutationList, ListeningObserver) => {
        for (let ElementMutation of MutationList) {
            if (ElementMutation !== null && ElementMutation.type === "childList") {
                const NewElements = ElementMutation.addedNodes;
                if (NewElements !== null) {
                    if ((NewElements instanceof Array) && NewElements.length > 0) {
                        NewElements.forEach((newElement) => {
                            if (newElement !== null && newElement instanceof Node) {
                                

                                ChatMessageUtility.InterfaceChangeListener.CheckForNewMessage();
                            }
                        });
                    }
                }
            }
        }
    });
}
// 
ChatNewDataObservers.DocumentChange.observe(ChatMessageUtility.ChatDisplayFrame, { childList: true });
