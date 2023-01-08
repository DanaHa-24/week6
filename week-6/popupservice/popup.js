function PopupService() {
  let currentPopup = null;

  function open(popupBody, options) {
    // If a popup is already open, close it
    if (currentPopup) {
      close();
    }

    // Create the overlay element
    const overlayElement = document.createElement('div');
    overlayElement.className = 'popup-overlay grey-background';
    console.log(overlayElement.className);
    document.body.appendChild(overlayElement);

    // Create the popup element
    const popupElement = document.createElement('div');
    popupElement.innerHTML = `
      <button class="close-button">X</button>
      ${popupBody}
    `;
    popupElement.className = options.popupClassName || '';
    document.body.appendChild(popupElement);

    // Add a click event listener to the close button to close the popup
    popupElement.querySelector('.close-button').addEventListener('click', close);

    // Close the popup when clicked outside
    if (options.isCloseByClickOutside) {
      overlayElement.addEventListener('click', closeOnClickOutside);
    }

    // Set the current popup to the new popup element
    currentPopup = popupElement;
  }

  function close() {
    if (currentPopup) {
      // Remove the popup element and the overlay element from the DOM
      document.body.removeChild(currentPopup);
      document.body.removeChild(document.querySelector('.popup-overlay'));

      // Reset the current popup to null
      currentPopup = null;

      // Remove the click event listeners
      document.removeEventListener('click', closeOnClickOutside);
    }
  }

  function closeOnClickOutside(event) {
    if (event.target === event.currentTarget) {
      close();
    }
  }

  return {
    open,
    close,
  };
}

export default PopupService;
