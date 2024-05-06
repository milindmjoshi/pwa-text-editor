const butInstall = document.getElementById('buttonInstall');


// Logic for installing the PWA
// Event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {

      console.log("Inside before Install Prompt:" + event);
      // Store the triggered events
      window.deferredPrompt = event;

      // Remove the hidden class from the button.
      butInstall.classList.toggle('hidden', false);
   
});

// click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {

console.log("Inside button click, deferred prompt is:" + window.deferredPrompt);
const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
   return;
  }

  // Show prompt
  promptEvent.prompt();
  
  // Reset the deferred prompt variable, it can only be used once.
  window.deferredPrompt = null;
  
  butInstall.classList.toggle('hidden', true);
  //butInstall.setAttribute("style","display: none");
   

 });

// handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Clear prompt
  console.log("App installed, clear defferedPrompt event");
  window.deferredPrompt = null;
});
