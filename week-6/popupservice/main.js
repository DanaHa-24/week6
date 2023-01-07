import PopupService from './popup.js';

const popupService = PopupService();

document.getElementById('open-popup-button').addEventListener('click', () => {
  popupService.open(`
    <img src="https://github.com/DanaHa-24.png" alt="Profile picture">
  `, {
    isCloseByClickOutside: true,
    popupClassName: 'git-profile-popup',
  });
});