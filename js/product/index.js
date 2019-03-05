let variants = [];
let selectedColor;
let selectedSize;
(() => {
  const { id } = getParams();

  function setColorBlocks(colors) {
    const colorBlocks = document.querySelector('.color-blocks');
    colors.forEach((color) => {
      const { code, name } = color;
      const colorBlock = easyCreateElement('div', {
        "class": "color-block",
        "title": name,
        "style": `background-color: #${code}`,
        "data-color": code
      });
      colorBlocks.appendChild(colorBlock);
    });
  }

  function setSizeBlocks(sizes) {
    const sizeBlocks = document.querySelector('.size-blocks');
    sizes.forEach((size) => {
      const sizeBlock = easyCreateElement('div', {
        "class": "size-block",
        "data-size": size
      }, size);
      sizeBlocks.appendChild(sizeBlock);
    });
  }

  function setInformation(information) {
    let { note, texture, description, wash, place } = information;
    const productInformation = document.querySelector('.product-information');
    note = easyCreateElement('p', null, `*${note}`);
    const textureTextNode = document.createTextNode(texture);
    const washTextNode = document.createTextNode(wash);
    const descriptionNodes = description.split('\n').reduce((accumulator, currentValue, index) => {
      const word = document.createTextNode(currentValue);
      const br = easyCreateElement('br');
      return index !== description.split('\n').length - 1 ? [...accumulator, word, br] : [...accumulator, word];
    }, []);
    description = easyCreateElement('p', null, null, [textureTextNode, easyCreateElement('br'), washTextNode, easyCreateElement('br'), ...descriptionNodes]);
    const materialPlaceNode = document.createTextNode(`素材產地 / ${place}`);
    const processingPlaceNode = document.createTextNode(`加工產地 / ${place}`);
    place = easyCreateElement('p', null, null, [materialPlaceNode, easyCreateElement('br'), processingPlaceNode]);
    productInformation.appendChild(note);
    productInformation.appendChild(description);
    productInformation.appendChild(place);
  }

  function setDescription(description) {
    const productDescriptionWrapper = document.querySelector('.product-description-wrapper');
    const { story, images } = description;
    const productDescription = easyCreateElement('p', { "class": "product-description" }, story);
    const productDescriptionImages = [...new Set(images)].map((image) => easyCreateElement('img', {
      "class": "product-description",
      "src": image,
      "alt": "product-description-img"
    }));
    const productDescriptionBlock = easyCreateElement('div', { "class": "product-description-block" }, null, [productDescription, ...productDescriptionImages]);
    productDescriptionWrapper.appendChild(productDescriptionBlock);
  }

  function hasColor() {
    const colorBlocks = [...document.querySelectorAll('.color-block')];
    return colorBlocks.some((colorBlock) => {
      const hasColorActive = colorBlock.classList.contains('active');
      if (hasColorActive) return true;
    });
  }

  function hasSize() {
    const sizeBlocks = [...document.querySelectorAll('.size-block')];
    return sizeBlocks.some((sizeBlock) => {
      const hasSizeActive = sizeBlock.classList.contains('active');
      if (hasSizeActive) return true;
    });
  }

  function setAddToCartButtonMessage() {
    const addToCartButton = document.querySelector('.add-to-cart-button');

    if (!hasColor()) {
      addToCartButton.value = '請選擇顏色';
      return false;
    }

    if (!hasSize()) {
      addToCartButton.value = '請選擇尺寸';
      return false;
    }

    addToCartButton.value = '加入購物車';
    return true;
  }

  function setProductMaxQuantities() {
    const addToCartButton = document.querySelector('.add-to-cart-button');
    const productQuantityInput = document.querySelector('.product-quantity');

    const hasColorAndSize = setAddToCartButtonMessage();
    if (!hasColorAndSize) return;

    const [{ stock }] = variants.filter(({ color_code, size, stock }) => {
      const colorCorrect = color_code === selectedColor.code;
      const sizeCorrect = size === selectedSize;
      if (colorCorrect && sizeCorrect) return true;
    });
    productQuantityInput.value = stock ? 1 : 0;
    productQuantityInput.max = stock;
  }

  function checkQuantity() {
    if (selectedColor) {
      variants
        .filter(({ color_code }) => selectedColor.code === color_code)
        .forEach(({ size, stock }) => {
          const sizeBlock = document.querySelector(`.size-block[data-size="${size}"]`);
          if (stock === 0) {
            sizeBlock.classList.add('disabled');
            sizeBlock.classList.remove('active');
            if (size === selectedSize) {
              selectedSize = undefined;
            }
          } else {
            sizeBlock.classList.remove('disabled');
          }
        });
    }
    if (selectedSize) {
      variants
        .filter(({ size }) => selectedSize === size)
        .forEach(({ color_code, stock }) => {
          const colorBlock = document.querySelector(`.color-block[data-color="${color_code}"]`);
          if (stock === 0) {
            colorBlock.classList.add('disabled');
            colorBlock.classList.remove('active');
            if (color_code === selectedColor) {
              selectedColor = undefined;
            }
          } else {
            colorBlock.classList.remove('disabled');
          }
        });
    }
    setAddToCartButtonMessage();
  }

  function triggerColorActive(e) {
    const activeColorBlocks = document.querySelectorAll('.color-block.active');
    if (activeColorBlocks) {
      activeColorBlocks.forEach((colorBlock) => colorBlock.classList.remove('active'));
    }
    e.target.classList.add('active');
  }

  function bindSelectColorEvent() {
    const colorBlocks = document.querySelectorAll('.color-block');
    colorBlocks.forEach((colorBlock) => {
      colorBlock.addEventListener('click', ({ target }) => selectedColor = { "code": target.dataset.color, "name": target.title });
      colorBlock.addEventListener('click', triggerColorActive);
      colorBlock.addEventListener('click', setProductMaxQuantities);
      colorBlock.addEventListener('click', checkQuantity);
    });
  }

  function triggerSizeActive(e) {
    const activeSizeBlocks = document.querySelectorAll('.size-block.active:not(.disabled)');
    if (activeSizeBlocks) {
      activeSizeBlocks.forEach((sizeBlock) => sizeBlock.classList.remove('active'));
    }
    e.target.classList.add('active');
  }

  function bindSelectSizeEvent() {
    const sizeBlocks = document.querySelectorAll('.size-block:not(.disabled)');
    sizeBlocks.forEach((sizeBlock) => {
      sizeBlock.addEventListener('click', ({ target }) => selectedSize = target.dataset.size);
      sizeBlock.addEventListener('click', triggerSizeActive);
      sizeBlock.addEventListener('click', setProductMaxQuantities);
      sizeBlock.addEventListener('click', checkQuantity);
    });
  }

  function triggerSizeChange(e) {
    if (!selectedColor || !selectedSize) return;
    const numberWrapper = document.querySelector('.number-wrapper');
    const { target } = e;
    const { classList } = target;
    const productQuantityInput = numberWrapper.querySelector('.product-quantity');
    const { value, min, max } = productQuantityInput;
    if (classList.contains('number-minus') && value > min) {
      productQuantityInput.value = parseInt(value) - 1;
    } else if (classList.contains('number-plus') && value < max) {
      productQuantityInput.value = parseInt(value) + 1;
    }
  }

  function bindSizeChangeEvent() {
    const numberWrapper = document.querySelector('.number-wrapper');
    numberWrapper.addEventListener('click', triggerSizeChange);
  }

  function bindAddToCartEvent() {
    const addToCartButton = document.querySelector('.add-to-cart-button');
    addToCartButton.addEventListener('click', (e) => {
      const id = parseInt(document.querySelector('.product-id').textContent);
      const name = document.querySelector('.product-title').textContent;
      const price = parseInt(document.querySelector('.product-price').textContent.split('.')[1]);
      const qty = parseInt(document.querySelector('.product-quantity').value);
      const img = document.querySelector('.product-img').getAttribute('src');
      const max = parseInt(document.querySelector('.product-quantity').max);
      const product = { id, name, price, color: selectedColor, size: selectedSize, qty, img, max };
      const isMissing = Object.values(product).some((value) => value === undefined);
      if (!isMissing) {
        insertUpdateCart(product);
      }
    });
  }

  getProduct(id)
    .then(({ data }) => {
      const productImage = document.querySelector('.product-img');
      const productTitle = document.querySelector('.product-title');
      const productId = document.querySelector('.product-id');
      const productPrice = document.querySelector('.product-price');
      const { main_image, title, id, price, colors, sizes, note, texture, description, wash, place, images, story, category } = data;
      productImage.setAttribute("src", main_image);
      productTitle.textContent = title;
      productId.textContent = id;
      productPrice.textContent = `TWD.${price}`;
      setColorBlocks(colors);
      bindSelectColorEvent();
      setSizeBlocks(sizes);
      bindSelectSizeEvent();
      bindSizeChangeEvent();
      bindAddToCartEvent();
      setInformation({ note, texture, description, wash, place });
      setDescription({ images, story });
      document.querySelectorAll(`.${category}Tab a`).forEach(tab => tab.classList.add('active'));
      variants = data.variants;
    });

})();