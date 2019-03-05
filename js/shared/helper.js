function easyCreateElement(element, properties, text, childElements) {
  const e = document.createElement(element);
  if (properties) {
    Object.entries(properties).forEach(([key, value]) => {
      if (key === 'class') {
        const classes = value.split(' ');
        classes.forEach((className) => e.classList.add(className));
      } else {
        e.setAttribute(key, value);
      }
    });
  }
  if (text) {
    e.textContent = text;
  }
  if (childElements) {
    if (Array.isArray(childElements)) {
      childElements.forEach((childElement) => e.appendChild(childElement));
    } else {
      e.appendChild(childElements);
    }
  }
  return e;
}

function getParams() {
  const urlString = window.location.href;
  const { searchParams } = new URL(urlString);
  const params = [...searchParams].reduce((prev, next) => {
    const [param, value] = next;
    return { ...prev, [param]: value };
  }, {});
  return params;
}

function setParams(params) {
  const urlString = window.location.href;
  const url = new URL(urlString);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined) {
        url.searchParams.delete(key);
      } else {
        url.searchParams.set(key, value);
      }
    });
  }
  return url;
}

function setBrowserQueryString(params) {
  const url = setParams(params);
  history.pushState("", "", url);
}

function removeChilds(element) {
  while (element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }
}

function setCartCounts() {
  const cart = getStorage('cart');
  const cartButton = document.querySelector('.cart-button');
  const cartButtonMobile = document.querySelector('.cart-button-mobile');
  const cartCounts = cart.length > 9 ? '9+' : cart.length;
  cartButton.dataset.counts = cartCounts;
  cartButtonMobile.dataset.counts = cartCounts;
}

function setStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function getStorage(key) {
  if (key === undefined) {
    console.log(JSON.parse(JSON.stringify(window.localStorage)));
    return JSON.parse(JSON.stringify(window.localStorage));
  }
  return JSON.parse(window.localStorage.getItem(key));
}

function getIndexOfSameProduct(product) {
  const { id, color, size } = product;
  const cart = getStorage('cart');
  let indexOfSameProduct;
  cart.some((item, index) => {
    const sameId = item.id === id;
    const sameColor = JSON.stringify(item.color) === JSON.stringify(color);
    const sameSize = item.size === size;
    if (sameId && sameColor && sameSize) {
      indexOfSameProduct = index;
      return true;
    }
  });
  return indexOfSameProduct;
}

function insertUpdateCart(product) {
  const cart = getStorage('cart');
  const indexOfSameProduct = getIndexOfSameProduct(product);
  if (indexOfSameProduct !== undefined) {
    const sameProduct = cart[indexOfSameProduct];
    let { qty, max } = product;
    qty += sameProduct.qty;
    if (qty > max) qty = max;
    cart[indexOfSameProduct] = { ...sameProduct, "qty": qty };
  } else {
    cart.push(product);
  }
  setStorage('cart', cart);
  setCartCounts();
}

function replaceCartProduct(product) {
  const cart = getStorage('cart');
  const indexOfSameProduct = getIndexOfSameProduct(product);
  if (indexOfSameProduct !== undefined) {
    const sameProduct = cart[indexOfSameProduct];
    cart[indexOfSameProduct] = { ...sameProduct, "qty": product.qty };
  }
  setStorage('cart', cart);
}

function removeCartProduct(product) {
  const cart = getStorage('cart');
  const indexOfSameProduct = getIndexOfSameProduct(product);
  if (indexOfSameProduct !== undefined) {
    cart.splice(indexOfSameProduct, 1);
  }
  setStorage('cart', cart);
  setCartCounts();
}

function checkObjectEmpty(object) {
  const checkMissing = (value) => {
    if (typeof value === "object") {
      if (Array.isArray(value)) {
        const emptyArray = value.length === 0;
        return emptyArray || value.some(checkMissing);
      }
      const emptyObject = Object.values(value).length === 0;
      return emptyObject || Object.values(value).some(checkMissing);
    }
    return value === undefined || value === "";
  };
  Object.values(object).some(checkMissing);
}

function setUserAvatar() {
  const fb = getStorage('fb');
  if (fb) {
    const { name, picture } = fb.user;
    const { url } = picture.data;
    const memberButton = document.querySelector('.member-button img');
    const memberButtonMobile = document.querySelector('.member-button-mobile');
    const memberButtonMobileImage = memberButtonMobile.querySelector('img');
    const memberButtonText = memberButtonMobile.querySelector('span');
    memberButton.setAttribute('src', url);
    memberButton.classList.add('avatar');
    memberButtonMobileImage.setAttribute('src', url);
    memberButtonMobileImage.classList.add('avatar');
    memberButtonText.textContent = name;
  }
}