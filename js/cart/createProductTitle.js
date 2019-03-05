const createProductTitle = (name, id) => {
  const productTitle = easyCreateElement('div', { "class": "product-title" }, name);
  const productId = easyCreateElement('div', { "class": "product-id" }, id);
  const productTitleWrapper = easyCreateElement('div', { "class": "product-title-wrapper" }, null, [productTitle, productId]);
  return productTitleWrapper;
}