import imagesLoaded from 'imagesloaded'
import { debounce } from 'debounce'
import { css } from 'emotion'

import GalleryLightbox from './GalleryLightbox'

const galleryPadding = 5;
const galleryCSS = css`
  margin: 1.5rem 0 3rem;
  position: relative;
  overflow: hidden;
  width: 100%;

  .gallery-row {
    display: flex;
    justify-content: center;
    margin-bottom: ${galleryPadding}px;
  }

  figure {
    cursor: pointer;
    margin: 0;
    position: absolute;
    overflow: hidden;

    &:hover {
      figcaption {
        bottom: 0;
      }
    }
  }

  img {
    margin: 0;
    width: 100%;
    display: block;
  }

  figcaption {
    font-size: .8rem;
    background: rgba(255, 255, 255, .6);
    padding: ${galleryPadding}px;
    position: absolute;
    bottom: -10em;
    left: 0;
    right: 0;
    transition: bottom .3s;
  }
`;

class Gallery {
  constructor(container, rowRatio) {
    this.container = container;
    this.swipeOrigin = null;

    // wait until all images are loaded to avoid sizing issues
    imagesLoaded(container, () => {
      const items = container.querySelectorAll('figure');
      const rows = [];
      this.items = [];
      let prevRowItem;
      items.forEach((element, index) => {
        const { width, height } = element.childNodes[0];
        const ratio = width / height;
        if (rows.length === 0 || Math.round(rows[rows.length - 1].ratio + ratio) > rowRatio) {
          rows.push({ items: [], ratio: 0 });
          prevRowItem = null;
        }
        const row = rows[rows.length - 1];
        const item = {element, width, height, ratio, prevRowItem}
        row.items.push(item);
        this.items.push(item);
        prevRowItem = item;
        row.ratio += ratio;
        element.parentElement.remove();
        element.addEventListener('click', () => {
          new GalleryLightbox(this, index);
        });
      });
      this.rows = rows;

      this.draw();
      // listen for window resize to trigger gallery redraws
      this.debouncedResize = debounce(() => this.draw(), 100).bind(this);
      window.addEventListener('resize', this.debouncedResize);
    });
  }

  destroy() {
    window.removeEventListener('resize', this.debouncedResize);
  }

  getRowItemXoffset (item, rowHeight) {
    if (!item || !item.prevRowItem) {
      return 0;
    }
    return item.prevRowItem.ratio * rowHeight + galleryPadding + this.getRowItemXoffset(item.prevRowItem, rowHeight);
  }

  draw() {
    const galleryWrapper = document.createElement('div');
    galleryWrapper.classList.add(galleryCSS);

    this.rows.forEach(row => {
      row.height = (this.container.clientWidth - galleryPadding * (row.items.length - 1)) / row.ratio;
      row.height = Math.min(row.height, 500); // this is to avoid huge vertical images
      const galleryRow = document.createElement('div');
      galleryRow.className = 'gallery-row';
      galleryRow.style.height = `${row.height}px`;
      row.items.forEach(item => {
        item.element.style.height = `${row.height}px`;
        item.element.style.width = `${row.height * item.ratio}px`;
        item.element.style.transform = `translate(${this.getRowItemXoffset(item, row.height)}px, 0)`;
        galleryRow.appendChild(item.element);
      });
      galleryWrapper.appendChild(galleryRow);
    });
    this.container.parentElement.replaceChild(galleryWrapper, this.container);
    this.container = galleryWrapper;
  }
}

export default Gallery;