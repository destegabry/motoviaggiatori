const { Gallery } = require('./src/utils/gallery');

let galleries = [];

exports.onRouteUpdate = () => {
  if (galleries.length > 0) {
    galleries.forEach(({ destroy }) => destroy());
  }
  galleries = Array.from(document.querySelectorAll('.md-gallery')).map((element) => new Gallery(element));
};
