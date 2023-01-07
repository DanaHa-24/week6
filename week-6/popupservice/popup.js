function PopupService() {
  let currentPopup = null;

  function open(popupBody, options) {
    // If a popup is already open, close it
    if (currentPopup) {
      close();
    }

    // Create the popup element
    const popupElement = document.createElement('div');
    popupElement.innerHTML = popupBody;
    popupElement.className = options.popupClassName || '';
    const body = document.getElementById('body');
    body.appendChild(popupElement);

    // Set the current popup to the new popup element
    currentPopup = popupElement;

    // Close the popup when clicked outside
    if (options.isCloseByClickOutside) {
      document.addEventListener('click', closeOnClickOutside);
    }
  }

  function close() {
    if (currentPopup) {
      // Remove the popup element from the DOM
      document.body.removeChild(currentPopup);

      // Reset the current popup to null
      currentPopup = null;

      // Remove the click event listener
      document.removeEventListener('click', closeOnClickOutside);
    }
  }

  function closeOnClickOutside(event) {
    if (!currentPopup.contains(event.target)) {
      close();
    }
  }

  return {
    open,
    close,
  };
}

export default PopupService;