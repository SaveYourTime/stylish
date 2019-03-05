class EasySlide {
  constructor(config) {
    this.config = {
      slider: document.querySelector('.slider'),
      sliderImages: document.querySelectorAll('.slider-img'),
      slidesCount: document.querySelectorAll('.slider-img').length - 2,
      dotsWrapper: document.querySelector('.dots-wrapper'),
      leftArrow: document.querySelector('.arrow-left'),
      rightArrow: document.querySelector('.arrow-right'),
      currentSlide: 1,
      cloneElementsCount: 2,
      transition: {
        property: 'transform',
        duration: 500,
        timingFunction: 'ease'
      },
    };

    this.initConfig(config);
    this.initDots();
    this.initArrows();
  }

  setConfig = (config) => {
    Object.assign(this.config, config);
  }

  initConfig = (config) => {
    this.setConfig(config);
    const { slider } = this.config;
    if (typeof slider === 'string') {
      this.setConfig({ slider: document.querySelector(slider) });
    }
    if (this.config.slider === null) {
      throw new Error('Something wrong with your selector 😭');
    }
  }

  initDots = () => {
    const { slider, slidesCount, dotsWrapper, cloneElementsCount } = this.config;
    slider.style.width = `${(slidesCount + cloneElementsCount) * 100}%`;

    removeChilds(dotsWrapper);

    for (var i = 0; i < slidesCount; i++) {
      const dot = document.createElement('li');
      dot.dataset.slide = i + 1;
      dotsWrapper.appendChild(dot);
    }

    dotsWrapper.addEventListener('click', (e) => {
      const { target } = e;
      const { nodeName, dataset } = target;
      const { slide } = dataset;
      if (target && nodeName === "LI") {
        this.setConfig({ currentSlide: parseInt(slide) });
        this.setDotActive();
        this.goToSlide();
      }
    });

    this.setConfig({ dots: dotsWrapper.querySelectorAll('li') });
    this.setDotActive();
  }

  initArrows = () => {
    this.config.leftArrow.addEventListener('click', () => this.triggerArrow('left'));
    this.config.rightArrow.addEventListener('click', () => this.triggerArrow('right'));
  }

  setDotActive = () => {
    const { dots, currentSlide } = this.config;
    dots.forEach((dot) => dot.classList.remove('active'));

    const dotsCount = dots.length;
    let index = currentSlide;
    if (currentSlide > dotsCount) {
      index = 0;
    } else if (currentSlide <= 0) {
      index = dotsCount - 1;
    } else {
      index -= 1;
    }
    dots[index].classList.add('active');
  }

  goToSlide = () => {
    const { slider, currentSlide, transition, timeout } = this.config;
    const { property, duration, timingFunction } = transition;
    if (slider.classList.contains('isAnimating')) {
      clearTimeout(timeout);
    }
    slider.style.transition = `${property} ${duration}ms ${timingFunction}`;
    slider.style.transform = `translateX(calc(-${(currentSlide) * 100}vw))`;
    slider.classList.add('isAnimating');
    return new Promise(async (resolve, reject) => {
      const timeout = setTimeout(() => {
        slider.style.transition = '';
        slider.classList.remove('isAnimating');
        resolve();
      }, 500);
      this.setConfig({ timeout });
    });
  }

  triggerArrow = async (direction) => {
    const { slider, currentSlide, dots } = this.config;
    const dotsCount = dots.length;
    let newSlide;
    if (direction === 'left') {
      newSlide = currentSlide < 1 ? dotsCount : currentSlide - 1;
    } else if (direction === 'right') {
      newSlide = currentSlide > dotsCount ? 1 : currentSlide + 1;
    }
    this.setConfig({ currentSlide: newSlide });
    this.setDotActive();
    await this.goToSlide();
    if (direction === 'left' && currentSlide <= 1) {
      slider.style.transform = `translateX(calc(-${(dotsCount) * 100}vw))`;
      this.setConfig({ currentSlide: dotsCount });
    } else if (direction === 'right' && currentSlide >= dotsCount) {
      slider.style.transform = `translateX(-100vw)`;
      this.setConfig({ currentSlide: 1 });
    }
  }

}
