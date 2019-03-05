(() => {
  if (!getStorage('cart')) setStorage('cart', []);
  setCartCounts();
  setUserAvatar();

  document.querySelector('.member-button').addEventListener('click', checkLoginState);
  document.querySelector('.member-button-mobile').addEventListener('click', checkLoginState);
  //document.write(`<script src="http://${(location.host || 'localhost').split(':')[0]}:35729/livereload.js?snipver=1"></script>`);
})();