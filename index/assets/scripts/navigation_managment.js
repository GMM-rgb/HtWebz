let searcherButton = document.querySelector("#searcherAppImageButton");
let searcherApp = document.querySelector("#searcherApp");

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
