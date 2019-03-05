(() => {
  const menTabs = document.querySelectorAll('.menTab');
  const womenTabs = document.querySelectorAll('.womenTab');
  const accessoriesTabs = document.querySelectorAll('.accessoriesTab');
  const data = [{
    "category": "men",
    "tabs": menTabs
  }, {
    "category": "women",
    "tabs": womenTabs
  }, {
    "category": "accessories",
    "tabs": accessoriesTabs
  }];
  data.forEach(({ category, tabs }) => {
    tabs.forEach((tab) => {
      tab.addEventListener('click', async (e) => {
        e.preventDefault();
        [...document.querySelectorAll('.main-nav a'), ...document.querySelectorAll('.main-nav-mobile a')]
          .forEach((tab) => tab.classList.remove('active'));
        e.target.classList.add('active');
        setBrowserQueryString({ nextPage: 0 });
        setBrowserQueryString({ category });
        const productBlocks = await getProductBlocksByCategory();
        replaceProductBlocks(productBlocks);
      });
    });
  });
})();