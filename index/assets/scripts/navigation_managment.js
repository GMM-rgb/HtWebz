let searcherButton = document.querySelector("#searcherAppImageButton");
let searcherApp = document.querySelector("#searcherApp");
let textEditorAppButton = document.querySelector("#textEditorAppButton");

let openingApp = false;

searcherButton.onclick = () => {
    if(openingApp === true) {return; } else {
        notify("Opening Searcher App...");
        openingApp = true;
        wait(1000).then(() => {
            window.open('index/search_index.html', '_blank');
            openingApp = false;
        });
    }
}

textEditorAppButton.onclick = () => {
    if(openingApp === true) {return; } else {
        notify("Opening Text Editor App...");
        openingApp = true;
        wait(1000).then(() => {
            window.open('index/file_list.html', '_blank');
            openingApp = false;
        });
    }
}
