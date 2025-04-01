let appButtonContainerWarp = document.getElementById('appButtonContainerWarp');

var buttonArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

window.onload = () => {
    // Remove the unnecessary inner loop and use the correct forEach method
    buttonArray.forEach(btnValue => {
        console.log(btnValue);
        const appContainerButton = document.createElement('button');
        appContainerButton.setAttribute('class', 'wbt-toolbar-button');
        appContainerButton.innerHTML = '...' + btnValue;  
        appButtonContainerWarp.appendChild(appContainerButton);  
    });
}
