const setProductPrice = (() => {
  const setProductPrice = () => {
    const calculateSubtotal = () => {
      const productBlocks = [...document.querySelectorAll('.product-block')];
      const subtotal = productBlocks.reduce((prev, curr) => {
        const subtotal = parseInt(curr.querySelector('.product-total').textContent.substring(3));
        return prev += subtotal;
      }, 0);
      return subtotal;
    };
    document.querySelector('.product-total-amount').textContent = calculateSubtotal();
    const freight = 30;
    document.querySelector('.product-freight').textContent = freight;
    document.querySelector('.should-pay').textContent = calculateSubtotal() + freight;
  }
  return setProductPrice;
})();