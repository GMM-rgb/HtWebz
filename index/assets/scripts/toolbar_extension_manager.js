// let appButtonContainerWarp = document.getElementById('appButtonContainerWarp');

// var buttonArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// window.onload = () => {
//     // Remove the unnecessary inner loop and use the correct forEach method
//     buttonArray.forEach(btnValue => {
//         console.log(btnValue);
//         const appContainerButton = document.createElement('button');
//         appContainerButton.setAttribute('class', 'wbt-toolbar-button');
//         appContainerButton.innerHTML = '...' + btnValue;  
//         appButtonContainerWarp.appendChild(appContainerButton);  
//     });
// }

let animationClass = "expandMenuAnimation"; // Animation name for the toolbarMenuExtension
let animationDuration = 500; // Duration in milliseconds

expandMenuToolbar.onclick = () => {
  if (toolbarExtension.style.display === "none" || toolbarExtension.style.display === "") {
    toolbarExtension.style.display = "flex";
    toolbarExtension.classList.add("expandMenuAnimation");
    alert("Toolbar is now visible!"); // Debugging log
    wait(animationDuration).then(() => {
      toolbarExtension.classList.remove("expandMenuAnimation");
      toolbarExtension.style.height = "fit-content";
      toolbarExtension.style.flex = "1 1 auto";
    });
  } else {
    alert("Toolbar is now hidden!"); // Debugging log
    toolbarExtension.style.display = "none"; // Hide the toolbar
  }

  console.log("Toolbar display state:", toolbarExtension.style.display); // Debugging log
};
