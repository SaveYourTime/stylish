(() => {
  const inputs = document.querySelectorAll('.order-information input');
  inputs.forEach((input) => {
    input.addEventListener('change', changeSubmitButtonState);
  });
})();