const { orderNumber } = getParams();
const header = document.querySelector('.header');
const orderNumberSelector = document.querySelector('.order-number');
const checkmark = document.querySelector('.checkmark');
const crossmark = document.querySelector('.crossmark');
const meta = document.querySelector('.meta');
const description = document.querySelector('.description');
let headerText = '';
let descriptionText = '';
if (orderNumber) {
  checkmark.classList.add('active');
  meta.classList.add('active');
  orderNumberSelector.textContent = orderNumber;
  headerText = `THANK YOU!`;
  descriptionText = `Thank you for shopping with us!`;
} else {
  crossmark.classList.add('active');
  document.querySelector('.meta').textContent = '';
  headerText = `Oops! Something error.`;
  descriptionText = `Sorry, a problem occurred. Please try later!`;
}
header.textContent = headerText;
description.textContent = descriptionText;