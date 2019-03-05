const createProductSelection = ({ name }, size) => {
  const productColor = easyCreateElement('div', { "class": "product-color" }, `顏色 | ${name}`);
  const productSize = easyCreateElement('div', { "class": "product-size" }, `尺寸 | ${size}`);
  const productSelection = easyCreateElement('div', { "class": "product-selection" }, null, [productColor, productSize]);
  return productSelection;
}