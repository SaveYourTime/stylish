(() => {
  const removeProduct = (e) => {
    const { target } = e;
    if (!target.classList.contains('cart-remove')) return;
    const product = JSON.parse(target.closest('.product-block').dataset.product);
    removeCartProduct(product);
    buildCart();
    setProductPrice();
  }
  document.querySelector('.product-blocks').addEventListener('click', removeProduct);
})();