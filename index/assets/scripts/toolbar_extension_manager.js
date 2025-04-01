let appButtonContainerWarp = document.getElementById('appButtonContainerWarp');

var buttonArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

window.onload = () => {
    buttonArray.forEach(wbtButton => {
        console.log(wbtButton);
        for (let wbtButton = 0; wbtButton <= 10; wbtButton++) {
            buttonArray.foreach(wbtButton => {
                console.log(wbtButton);
                const appContainerButton = document.createElement('button').setAttribute('class', 'wbt-toolbar-button');
                appContainerButton.innerHTML = '...' + wbtButton;  
                appButtonContainerWarp.appendChild(appContainerButton);  
            });
        }
    });
}
