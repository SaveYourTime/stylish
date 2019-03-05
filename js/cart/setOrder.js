const setOrder = () => {
  const subtotal = parseInt(document.querySelector('.product-total-amount').textContent);
  const freight = parseInt(document.querySelector('.product-freight').textContent);
  const total = parseInt(document.querySelector('.should-pay').textContent);
  const name = document.querySelector('.name').value;
  const phone = document.querySelector('.phone').value;
  const email = document.querySelector('.email').value;
  const address = document.querySelector('.address').value;
  const time = document.querySelector('.deliver-time:checked').value;
  const order = {
    shipping: "delivery",
    payment: "credit_card",
    subtotal,
    freight,
    total,
    recipient: {
      name,
      phone,
      email,
      address,
      time: time
    },
    list: getStorage('cart')
  };
  return order;
}