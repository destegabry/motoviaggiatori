const { Gallery } = require('./src/utils/gallery');

exports.onRouteUpdate = () => {
  document.querySelectorAll('.md-gallery').forEach(Gallery);
};
