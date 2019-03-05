const createProductContent = (productImage, productTitle, productSelection) => {
  const productContentWrapper = easyCreateElement('div', { "class": "product-content-wrapper" }, null, [productTitle, productSelection]);
  const productContent = easyCreateElement('div', { "class": "product-content" }, null, [productImage, productContentWrapper]);
  return productContent;
}