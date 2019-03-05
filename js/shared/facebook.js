window.fbAsyncInit = function () {
  FB.init({
    appId: '1983549371950410',
    cookie: true,
    xfbml: false,
    version: 'v3.2'
  });

  FB.AppEvents.logPageView();
};

(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) { return; }
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function checkLoginState() {
  function getUserInformation() {
    return new Promise((resolve) => {
      FB.api('/me', { fields: 'picture.type(large),name,email' }, (response) => resolve(response));
    });
  }

  function statusChangeCallback(response) {
    const { authResponse, status } = response;
    if (status === 'connected') {
      getUserInformation()
        .then((user) => {
          let fb = getStorage('fb') || {};
          fb = { ...fb, user, auth: authResponse };
          setStorage('fb', fb);
          location.href = 'profile.html';
        });
    } else {
      FB.login(statusChangeCallback, { scope: 'email' });
    }
  }

  FB.getLoginStatus(statusChangeCallback);
}