fetch('header.html')
  .then((res) => res.text())
  .then((res) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(res, "text/html");
    [...doc.body.children].forEach((header) => document.querySelector('body').prepend(header));
  })
  .then(() => {
    if (!getStorage('cart')) window.localStorage.setItem('cart', JSON.stringify([]));
    setCartCounts();
  });