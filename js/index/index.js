const { category, keyword } = getParams();
if (keyword) {
  searchProductByKeyword(keyword);
} else {
  if (!category) setBrowserQueryString({ category: 'all' });
  setBrowserQueryString({ nextPage: 0 });
  getProductBlocksByCategory()
    .then((productBlocks) => replaceProductBlocks(productBlocks));
}