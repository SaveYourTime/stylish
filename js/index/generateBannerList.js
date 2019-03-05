function generateBannerList(data) {
  const bannerList = data.map((slide) => {
    const { picture, story } = slide;
    const words = story.split('\n');
    const storyNodes = words.reduce((accumulator, currentValue, index) => {
      const word = document.createTextNode(currentValue);
      const br = easyCreateElement('br');
      return index !== words.length - 1 ? [...accumulator, word, br] : [...accumulator, word];
    }, []);
    /*
    const storyNodes = words.map((word, index) => {
      const wordNode = document.createTextNode(word);
      const br = easyCreateElement('br');
      return words.length - 1 !== index ? [wordNode, br] : [wordNode];
    }).flat();
    */
    const sliderTitle = easyCreateElement('p', { "class": "slider-title" }, null, storyNodes);
    const sliderText = easyCreateElement('div', { "class": "slider-text" }, null, sliderTitle);
    const sliderImage = easyCreateElement('img', {
      "class": "slider-img",
      "src": `https://api.appworks-school.tw${picture}`,
      "alt": "banner"
    });
    const sliderCard = easyCreateElement('div', { "class": "slider-card" }, null, [sliderText, sliderImage]);
    return sliderCard;
  });
  bannerList.push(bannerList[0].cloneNode(true));
  bannerList.unshift(bannerList[bannerList.length - 2].cloneNode(true));
  return bannerList;
}