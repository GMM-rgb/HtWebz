const ChatRootContainer = document.getElementById("ChatFlexContainer");
const ChatDisplayFrame = ChatRootContainer.querySelector(".ChatDisplay");

const MessageLayouts = {
    ThisPerson: `

    `,
    RemotePerson: `
    
    `
};

const NewChatMessageListener = new CustomEvent("newmessage", {
    detail: {
        MessageDataString: "",
    },
    bubbles: true
});



ChatDisplayFrame.dispatchEvent(NewChatMessageListener);
