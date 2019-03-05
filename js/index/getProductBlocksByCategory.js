const getProductBlocksByCategory = async (paging = 0) => {
  const { category, nextPage } = getParams();
  const products = await getProducts(category, nextPage || paging);
  setBrowserQueryString({ nextPage: products.paging });
  const productBlocks = generateProductBlocks(products.data);
  return productBlocks;
}