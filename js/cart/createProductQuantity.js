const createProductQuantity = (max, qty) => {
  const productQuantity = easyCreateElement('select', { "class": "product-quantity" });
  for (let i = 1; i <= max; i++) {
    const option = easyCreateElement('option', { "value": i }, i);
    productQuantity.appendChild(option);
  }
  productQuantity.value = qty;
  const productQuantityWrapper = easyCreateElement('div', { "class": "product-quantity-wrapper" }, null, productQuantity);
  return productQuantityWrapper;
}