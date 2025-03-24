let searcherButton = document.querySelector("#searcherAppImageButton");
let searcherApp = document.querySelector("#searcherApp");

searcherButton.onclick = () => {
    notify("Opening Searcher App...");
    wait(1000).then(() => {
        window.open('index/search_index.html', '_blank');
    });
}
