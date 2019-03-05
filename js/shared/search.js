(() => {
  const logo = document.querySelector('.logo');
  const searchInput = document.querySelector('.search-input');
  const searchButton = document.querySelector('.search-button');

  searchInput.addEventListener('focus', () => {
    const { category } = getParams();
    if (!category) setBrowserQueryString({ category: 'all' });
  });
  searchInput.addEventListener('keydown', async (e) => {
    const { keyCode, target } = e;
    const { value } = target;
    if (keyCode !== 13 || value === "") return;
    if (location.href.includes('index')) {
      searchProductByKeyword(value);
      setBrowserQueryString({ keyword: value });
    } else {
      location.href = `index.html?keyword=${value}`
    }
  });
  searchInput.addEventListener('blur', () => {
    if (logo.style.display !== 'none') return;
    logo.style.display = 'block';
    searchInput.style.display = 'none';
    searchButton.style.display = 'block';
  });

  searchButton.addEventListener('click', () => {
    logo.style.display = 'none';
    searchInput.style.display = 'inline-block';
    searchButton.style.display = 'none';
    searchInput.focus();
  });
})();