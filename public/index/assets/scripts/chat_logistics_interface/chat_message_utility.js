const ChatRootContainer = document.getElementById("ChatFlexContainer");
const ChatDisplayFrame = ChatRootContainer.querySelector(".ChatDisplay");

const NewChatMessageListener = new CustomEvent("newmessage", {
    detail: {

    },
    bubbles: true
});

ChatDisplayFrame.dispatchEvent(NewChatMessageListener);
