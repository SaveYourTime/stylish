const createProductExtraContentTitles = () => {
  const productQuantityTitle = easyCreateElement('div', { "class": "product-quantity-title" }, '數量');
  const productUnitPriceTitle = easyCreateElement('div', { "class": "product-unit-price-title" }, '單價');
  const productTotalTitle = easyCreateElement('div', { "class": "product-total-title" }, '小計');
  const productExtraContentTitles = easyCreateElement('div', { "class": "extra-content-titles" }, null, [productQuantityTitle, productUnitPriceTitle, productTotalTitle]);
  return productExtraContentTitles;
}