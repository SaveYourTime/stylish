function replaceProductBlocks(productBlocks) {
  const row = document.querySelector('.row');
  removeChilds(row);
  productBlocks.forEach((productBlock) => row.appendChild(productBlock));
}