const { default: Swiper, Navigation, Pagination } = require('swiper');

exports.onClientEntry = () => {
  Swiper.use(Navigation, Pagination);
};

/* eslint-disable no-console */
exports.onRouteUpdate = () => {
  document.querySelectorAll('.swiper-container').forEach((element) => {
    new Swiper(element, {
      centeredSlides: true,
      spaceBetween: 8,
      slidesPerView: 'auto',
      preloadImages: true,
      updateOnImagesReady: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  });
};
