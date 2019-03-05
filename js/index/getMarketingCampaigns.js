getMarketingCampaigns()
  .then(({ data }) => {
    const bannerList = generateBannerList(data);
    bannerList.forEach((banner) => document.querySelector('.slider').appendChild(banner));

    const easySlide = new EasySlide({ slider: '.slider' });
    setInterval(() => easySlide.triggerArrow('right'), 10000);
  });