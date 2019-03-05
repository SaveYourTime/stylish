function generateProductBlocks(data) {
  const productBlocks = data.map((product) => {
    const { id, main_image, price, colors, title } = product;

    const colorBlocks = colors.map((color) => {
      const { code } = color;
      const colorBlock = easyCreateElement('div', {
        "class": "color-block",
        "style": `background-color: #${code}`
      });
      return colorBlock;
    });

    const colorBlocksWrapper = easyCreateElement('div', { "class": "color-blocks" }, null, colorBlocks);
    const productTitle = easyCreateElement('div', { "class": "product-title" }, title);
    const productPrice = easyCreateElement('div', { "class": "product-price" }, `TWD.${price}`);
    const cardImg = easyCreateElement('img', {
      "class": "card-img",
      "src": main_image,
      "alt": "card-img"
    });
    const cardContent = easyCreateElement('div', { "class": "card-content" }, null, [colorBlocksWrapper, productTitle, productPrice]);
    const linkProduct = easyCreateElement('a', { "href": `product.html?id=${id}` }, null, [cardImg, cardContent]);
    const card = easyCreateElement('div', { "class": "card" }, null, linkProduct);
    const col = easyCreateElement('div', { "class": "col" }, null, card);
    return col;
  });
  return productBlocks;
}