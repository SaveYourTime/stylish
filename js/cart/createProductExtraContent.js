const createProductExtraContent = (productExtraContentTitles, productQuantity, price, qty) => {
  const productUnitPrice = easyCreateElement('div', { "class": "product-unit-price" }, `NT.${price}`);
  const productTotal = easyCreateElement('div', { "class": "product-total" }, `NT.${price * qty}`);
  const cartRemove = easyCreateElement('img', {
    "src": "./img/cart-remove.png",
    "alt": "cart-remove",
    "class": "cart-remove"
  });
  const productExtraContent = easyCreateElement('div', { "class": "extra-content" }, null, [productQuantity, productUnitPrice, productTotal, cartRemove]);
  const productExtraContentWrapper = easyCreateElement('div', { "class": "product-extra-content" }, null, [productExtraContentTitles, productExtraContent]);
  return productExtraContentWrapper;
}