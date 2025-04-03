// Minimize Button Variables
const mbc = document.getElementById('minimize-button-container');
const mb = document.getElementById('minimize-toolbar-button');
// Toolbar Container
const tb = document.getElementById('toolbar-container');
// Calculator


mb.addEventListener('click', function() {
if(mb.style.color === 'black' || mb.style.color === '') {
  mb.style.borderTop = '2px solid darkgray';
  mb.style.borderLeft = '2px solid darkgray';
  mb.style.borderRight = '2px solid gray';
  mb.style.borderBottom = '2px solid gray';
  mb.style.color = 'skyblue';
  // container
  mbc.style.border = '1px solid #ccc';
  mbc.style.padding = '3px';
  mbc.style.rotate = '-180deg';
  mbc.style.marginTop = '-45px';
} else {
  mb.style.borderTop = '2px solid black';
  mb.style.borderLeft = '2px solid black';
  mb.style.borderRight = '2px solid black';
  mb.style.borderBottom = '2px solid black';
  mb.style.color = 'black';
  // container
  mbc.style.border = 'none';
  mbc.style.padding = '4px';
  mbc.style.rotate = '0deg';
  mbc.style.marginTop = '7.25px';
}
});


// Minimize toolbar-container
mb.addEventListener('click', function() {
  if(tb.style.opacity === '1' || tb.style.opacity === '') {
    tb.style.opacity = '0';
    tb.style.pointerEvents = 'none';
  } else if(tb.style.opacity === '0' || tb.style.opacity === '') {
    tb.style.opacity = '1';
    tb.style.pointerEvents = 'all';
  }
});
