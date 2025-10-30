const GrabContentSectionBtns = document.querySelectorAll("");
const ContentSectionIndexLocalstorageData = localStorage.getItem("ContentSectionIndexs");

let ContentSectionIndexData = JSON.parse(ContentSectionIndexLocalstorageData) || {} ? ContentSectionIndexLocalstorageData : {};


