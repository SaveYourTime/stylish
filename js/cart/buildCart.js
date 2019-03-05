const buildCart = (() => {
  return (() => {
    const productBlocks = document.querySelector('.product-blocks');
    removeChilds(productBlocks);
    
    const cart = getStorage('cart');
    cart.forEach(({ id, name, img, color, size, qty, price, max }) => {      
      const productImage = createProductImage(img);
      const productTitle = createProductTitle(name, id);
      const productSelection = createProductSelection(color, size);
      const productContent = createProductContent(productImage, productTitle, productSelection);
      const productExtraContentTitles = createProductExtraContentTitles();
      const productQuantity = createProductQuantity(max, qty);
      const productExtraContent = createProductExtraContent(productExtraContentTitles, productQuantity, price, qty);

      const productBlock = easyCreateElement('div', { "class": "product-block", "data-product": JSON.stringify({ id, color, size }) }, null, [productContent, productExtraContent]);
      productBlocks.appendChild(productBlock);
    });
  });
})();