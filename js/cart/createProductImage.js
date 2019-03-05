const createProductImage = (img) => {
  const productImage = easyCreateElement('img', {
    "src": img,
    "alt": "product-img",
    "class": "product-img"
  });
  const productImageWrapper = easyCreateElement('div', { "class": "product-img-wrapper" }, null, productImage);
  return productImageWrapper;
}