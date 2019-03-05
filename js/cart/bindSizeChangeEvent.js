(() => {
  const sizeChange = (e) => {
    const { target } = e;
    const { value, classList } = target;
    if (!classList.contains('product-quantity')) return;
    const product = JSON.parse(target.closest('.product-block').dataset.product);
    replaceCartProduct({...product, qty: value});
    buildCart();
    setProductPrice();
  }
  document.querySelector('.product-blocks').addEventListener('change', sizeChange);
})();