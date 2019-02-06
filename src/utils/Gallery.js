import imagesLoaded from 'imagesloaded'
import { debounce } from 'debounce'

class Gallery {
  constructor(container, rowRatio, padding) {
    this.padding = padding;
    this.container = container;

    // wait until all images are loaded to avoid sizing issues
    imagesLoaded(container, () => {
      const items = container.querySelectorAll('figure');
      const rows = [];
      let prevRowItem;
      items.forEach(element => {
        const { width, height } = element.childNodes[0];
        const ratio = width / height;
        if (rows.length === 0 || Math.round(rows[rows.length - 1].ratio + ratio) > rowRatio) {
          rows.push({ items: [], ratio: 0 });
          prevRowItem = null;
        }
        const row = rows[rows.length - 1];
        const item = {element, width, height, ratio, prevRowItem}
        row.items.push(item);
        prevRowItem = item;
        row.ratio += ratio;
        element.parentElement.remove();
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
    return item.prevRowItem.ratio * rowHeight + this.padding + this.getRowItemXoffset(item.prevRowItem, rowHeight);
  }

  draw() {
    const galleryWrapper = document.createElement('div');
    galleryWrapper.className = 'gallery-wrapper';
    this.rows.forEach(row => {
      row.height = (this.container.clientWidth - this.padding * (row.items.length - 1)) / row.ratio;
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
  };
}

export default Gallery;