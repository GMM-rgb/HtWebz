const ChatRootContainer = document.getElementById("ChatFlexContainer");
const ChatDisplayFrame = ChatRootContainer.querySelector(".ChatDisplay");

const NewChatMessageListener = new CustomEvent("newmessage", {
    detail: {
        MessageDataString: "",
    },
    bubbles: true
});



ChatDisplayFrame.dispatchEvent(NewChatMessageListener);
