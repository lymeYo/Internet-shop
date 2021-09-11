function deviceTouchCheck() {
   // let windowsDevice = () => 
   return ('ontouchstart' in window);
}

document.body.classList.add(deviceTouchCheck() ? '_touch' : '_pc');
// document.body.classList.add('_touch')