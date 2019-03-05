(() => {
  const checkout = async () => {
    const order = setOrder();
    const prime = await getPrime();
    const submitButton = document.querySelector('.confirm-button');
    const errorWrapper = document.querySelector('.error-wrapper');
    if (checkObjectEmpty({ order, prime })) {
      errorWrapper.style.display = 'block';
      submitButton.setAttribute('disabled', 'disabled');
      return false;
    }
    const { data, error } = await orderCheckout({ order, prime });
    const { number } = data;
    if (error) {
      errorWrapper.style.display = 'block';
      submitButton.setAttribute('disabled', 'disabled');
      return false;
    }
    setStorage('cart', []);
    window.location.href = `thank-you.html?orderNumber=${number}`;
  }
  document.querySelector('.confirm-button').addEventListener('click', checkout);
})();