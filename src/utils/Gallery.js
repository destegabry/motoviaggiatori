import imagesLoaded from 'imagesloaded'
import { debounce } from 'debounce'
import { css } from '@emotion/core'


// Get mouse/touch event coords
function getEventOrigin(e) {
  const origin = e.changedTouches ? e.changedTouches[0] : e;
  return {
    x: origin.clientX,
    y: origin.clientY,
  }
};

const galleryPadding = 5;
const galleryCSS = css`
  margin: 1.5rem 0 3rem;
  position: relative;
  overflow: hidden;
  width: 100%;

  .gallery-row {
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
        this.items.push(item);
        prevRowItem = item;
        row.ratio += ratio;
        element.parentElement.remove();
        element.addEventListener('click', () => this.lightboxOpen(item));
      });
      this.rows = rows;

      this.draw();
      // listen for window resize to trigger gallery redraws
      this.debouncedResize = debounce(() => this.draw(), 100).bind(this);
      window.addEventListener('resize', this.debouncedResize);
    });

    this.lightboxClose = this.lightboxClose.bind(this);
    this.lightboxNext = this.lightboxNext.bind(this);
    this.lightboxPrev = this.lightboxPrev.bind(this);
    this.lightboxKeydown = this.lightboxKeydown.bind(this);
    this.swipeStarts = this.swipeStarts.bind(this);
    this.swipeDrag = this.swipeDrag.bind(this);
    this.swipeEnds = this.swipeEnds.bind(this);
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

  lightboxKeydown(event) {
    switch(event.keyCode) {
      case 27: // Escape
        this.lightboxClose();
        break;
      case 37: // Left arrow
        this.lightboxPrev();
        break;
      case 39: // Right arrow
        this.lightboxNext();
        break;
      default: break;
    }
  }

  swipeStarts(event) {
    this.swipeOrigin = getEventOrigin(event);
  }

  swipeDrag(event) {
    if (this.swipeOrigin) {
      const currentSwipe = getEventOrigin(event);
      const dx = currentSwipe.x - this.swipeOrigin.x;
      const dy = currentSwipe.y - this.swipeOrigin.y;
      const figure = this.lightbox.children[0];
      figure.style.left = `${dx}px`;
      figure.style.top = `${dy}px`;
    }
  }

  swipeEnds(event) {
    if (this.swipeOrigin) {
      const swipeEnd = getEventOrigin(event);
      const dx = swipeEnd.x - this.swipeOrigin.x;
      const dy = swipeEnd.y - this.swipeOrigin.y;

      if (Math.abs(dy) > Math.abs(dx)) {
        this.lightboxClose();
      } else if(dx > 0) {
        this.lightboxPrev();
      } else {
        this.lightboxNext();
      }

      this.swipeOrigin = null;
    }
  }

  setLightboxItem(index) {
    this.currentLightboxItem =this.items[index];

    const figure = this.currentLightboxItem.element.cloneNode(true);
    figure.removeAttribute('style');

    this.lightbox.replaceChild(figure, this.lightbox.children[0]);
  }

  lightboxNext() {
    const currentItemIndex = Math.min(this.items.indexOf(this.currentLightboxItem) + 1, this.items.length - 1);
    this.setLightboxItem(currentItemIndex);
  }

  lightboxPrev() {
    const currentItemIndex = Math.max(0, this.items.indexOf(this.currentLightboxItem) - 1);
    this.setLightboxItem(currentItemIndex);
  }

  lightboxOpen(item) {
    this.currentLightboxItem = item;
    this.lightbox = document.createElement('div');
    this.lightbox.className = 'gallery-lightbox';

    const figure = item.element.cloneNode(true);
    figure.removeAttribute('style');

    const controls = document.createElement('div');
    controls.className = 'gallery-lightbox-controls';

    const close = document.createElement('span');
    close.className = 'control control-close';
    close.innerHTML = '&times;';
    close.addEventListener('click', this.lightboxClose);
    controls.appendChild(close);

    if (this.items.length > 1) {
      const next = document.createElement('span');
      next.className = 'control control-next';
      next.innerText = '>';
      next.addEventListener('click', this.lightboxNext);
      controls.appendChild(next);

      const prev = document.createElement('span');
      prev.className = 'control control-prev';
      prev.innerText = '<';
      prev.addEventListener('click', this.lightboxPrev);
      controls.appendChild(prev);
    }

    this.lightbox.appendChild(figure);
    this.lightbox.appendChild(controls);

    document.addEventListener('keydown', this.lightboxKeydown);
    this.lightbox.addEventListener('touchstart', this.swipeStarts);
    this.lightbox.addEventListener('touchmove', this.swipeDrag);
    this.lightbox.addEventListener('touchend', this.swipeEnds);

    this.container.parentElement.appendChild(this.lightbox);

    document.querySelectorAll('html,body').forEach(el => {
      el.style.overflow = 'hidden';
    });
  }

  lightboxClose() {
    document.removeEventListener('keydown', this.lightboxKeydown);
    document.querySelectorAll('html,body').forEach(el => {
      el.style.overflow = 'auto';
    });

    this.lightbox.removeEventListener('touchstart', this.swipeStarts);
    this.lightbox.removeEventListener('touchmove', this.swipeDrag);
    this.lightbox.removeEventListener('touchend', this.swipeEnds);
    this.lightbox.parentElement.removeChild(this.lightbox);
  }
}

export default Gallery;