function appendProductBlocks(productBlocks) {
  const row = document.querySelector('.row');
  productBlocks.forEach((productBlock) => row.appendChild(productBlock));
}