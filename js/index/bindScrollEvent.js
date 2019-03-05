(() => {
  let isLoading = false;
  window.addEventListener('scroll', async () => {
    const row = document.querySelector('.row');
    const { category, nextPage } = getParams();
    if (!nextPage) return;
    const rowBottomToScreenTop = row.getBoundingClientRect().bottom;
    const screenHeight = document.documentElement.clientHeight;
    const detectOffset = 250;
    if (rowBottomToScreenTop - screenHeight <= detectOffset) {
      if (isLoading) return;
      isLoading = true;
      let productBlocks;
      if (category === 'search') {
        const { value } = document.querySelector('.search-input');
        const { data, paging } = await searchProducts(value, nextPage);
        setBrowserQueryString({ nextPage: paging });
        productBlocks = generateProductBlocks(data);
      } else {
        productBlocks = await getProductBlocksByCategory(category);
      }
      appendProductBlocks(productBlocks);
      isLoading = false;
    }
  });
})();