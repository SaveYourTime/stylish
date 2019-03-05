searchProductByKeyword = async (keyword) => {
  const row = document.querySelector('.row');
  const { data } = await searchProducts(keyword);
  if (data.length) {
    const productBlocks = generateProductBlocks(data);
    replaceProductBlocks(productBlocks);
  } else {
    row.innerHTML = `<p class="no-result">There're no result.</p>`;
  }
}