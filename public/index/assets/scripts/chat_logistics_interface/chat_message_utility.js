// 
//
//
/**
 * @type {HTMLDivElement}
 */
const ChatMessageDataTag = document.getElementById("NewIncommingMessage");
export const ChatRootContainer = document.getElementById("ChatFlexContainer");
export const ChatDisplayFrame = ChatRootContainer.querySelector(".ChatDisplay");
/**
 * Message constructor requirement `HTML` data.
 */
class MessageContentData {
    /**
     * @readonly  
     * \...
     * #### Contains `HTML` Layout Templates such as... :
     * - `UserMessage`
     * ```html
     * <div class="chat-message">
     *      <span class="chat-message-content"></span>
     * </div>
     * ```
     * - `SystemMessage`
     * ```html
     * <div class="chat-message system">
     *      <span class="chat-message-content"></span>
     * </div>
     * ```
     */
    static MessageLayouts = {
        UserMessage: `
            <div class="chat-message">
                <span class="chat-message-content"></span>
            </div>
        `,
        SystemMessage: `
            <div class="chat-message system">
                <span class="chat-message-content"></span>
            </div>
        `,
    };
}
/**
 * 
 */
class MessageConstructor {
    /**
     * @param {"User"|"System"} MessageElementType
     * @returns {HTMLElement?}
     */
    static async ConstructNewMessageElement(MessageElementType) {
        // 
        console.debug(`Constructing new Message Node...`);
        // 
        if (ChatMessageDataTag !== null && ChatMessageDataTag instanceof HTMLDataElement) {
            
        }
        // 
        console.info();
    }
}
/**
 * 
 */
class InterfaceChangeListening {
    /**
     * 
     * @param {HTMLSpanElement} UserNameLabel
     * @param {string} MessageContentText
     */
    static CheckForNewMessage(UserNameLabel, MessageContentText) {
        const NewChatMessageListener = new CustomEvent("newmessage", {
            detail: {
                UsersName: null,
                MessageDataString: null
            },
            bubbles: false,
            cancelable: true,
        });
        //
        ChatDisplayFrame.dispatchEvent(NewChatMessageListener);
    }
}

export {
    MessageContentData as MessageTemplates,
    InterfaceChangeListening as InterfaceChangeListener,
};
