(() => {
  const fb = getStorage('fb');
  if (fb) {
    const { name, id, email, picture } = fb.user;
    const { data } = picture;
    const { url } = data;
    const userName = document.querySelector('.user-name');
    const userId = document.querySelector('.user-id');
    const userEmail = document.querySelector('.user-email');
    const userImg = document.querySelector('.user-img');
    userName.textContent = name;
    userId.textContent = id;
    userEmail.textContent = email;
    userImg.setAttribute("src", url);
  }
})();