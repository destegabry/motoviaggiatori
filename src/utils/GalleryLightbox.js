import { css } from '@emotion/core'

const GalleryLightboxCSS = css`
  background: rgba(0, 0, 0, .95);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1000;
  user-select: none;

  figure {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    position: relative;
    pointer-events: none;
  }

  figcaption {
    color: white;
    font-size: .85rem;
  }

  .gallery-lightbox-controls {
    .control {
      color: white;
      cursor: pointer;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.5rem;
      height: 2rem;
      width: 2rem;
    }

    .control-next {
      right: 0;
      top: 50%;
      margin-top: -1rem
    }

    .control-prev {
      left: 0;
      top: 50%;
      margin-top: -1rem
    }

    .control-close {
      top: 0;
      right: 0;
    }
  }
`;

// Get mouse/touch event coords
function getEventOrigin(e) {
  const origin = e.changedTouches ? e.changedTouches[0] : e;
  return {
    x: origin.clientX,
    y: origin.clientY,
  }
};

class GalleryLightbox {
  constructor(items) {
    this.items = items;

    this.close = this.close.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.keydown = this.keydown.bind(this);
    this.swipeStarts = this.swipeStarts.bind(this);
    this.swipeDrag = this.swipeDrag.bind(this);
    this.swipeEnds = this.swipeEnds.bind(this);
  }

  onKeydown(event) {
    switch(event.keyCode) {
      case 27: // Escape
        this.close();
        break;
      case 37: // Left arrow
        this.prev();
        break;
      case 39: // Right arrow
        this.next();
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
      const figure = this.container.children[0];
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
        this.close();
      } else if(dx > 0) {
        this.prev();
      } else {
        this.next();
      }

      this.swipeOrigin = null;
    }
  }

  setItem(index) {
    this.currentLightboxItem =this.items[index];

    const figure = this.currentLightboxItem.element.cloneNode(true);
    figure.removeAttribute('style');

    this.container.replaceChild(figure, this.container.children[0]);
  }

  next() {
    const currentItemIndex = Math.min(this.items.indexOf(this.currentLightboxItem) + 1, this.items.length - 1);
    this.setItem(currentItemIndex);
  }

  prev() {
    const currentItemIndex = Math.max(0, this.items.indexOf(this.currentLightboxItem) - 1);
    this.setItem(currentItemIndex);
  }

  open(item) {
    this.currentLightboxItem = item;
    this.container = document.createElement('div');
    this.container.classList.add(GalleryLightboxCSS);

    const figure = item.element.cloneNode(true);
    figure.removeAttribute('style');

    const controls = document.createElement('div');
    controls.className = 'gallery-lightbox-controls';

    const close = document.createElement('span');
    close.className = 'control control-close';
    close.innerHTML = '&times;';
    close.addEventListener('click', this.close);
    controls.appendChild(close);

    if (this.items.length > 1) {
      const next = document.createElement('span');
      next.className = 'control control-next';
      next.innerText = '>';
      next.addEventListener('click', this.next);
      controls.appendChild(next);

      const prev = document.createElement('span');
      prev.className = 'control control-prev';
      prev.innerText = '<';
      prev.addEventListener('click', this.prev);
      controls.appendChild(prev);
    }

    this.container.appendChild(figure);
    this.container.appendChild(controls);

    document.addEventListener('keydown', this.onKeydown);
    this.container.addEventListener('touchstart', this.swipeStarts);
    this.container.addEventListener('touchmove', this.swipeDrag);
    this.container.addEventListener('touchend', this.swipeEnds);

    this.container.parentElement.appendChild(this.container);

    document.querySelectorAll('html,body').forEach(el => {
      el.style.overflow = 'hidden';
    });
  }

  close() {
    document.removeEventListener('keydown', this.onKeydown);
    document.querySelectorAll('html,body').forEach(el => {
      el.style.overflow = 'auto';
    });

    this.container.removeEventListener('touchstart', this.swipeStarts);
    this.container.removeEventListener('touchmove', this.swipeDrag);
    this.container.removeEventListener('touchend', this.swipeEnds);
    this.container.parentElement.removeChild(this.container);
  }
}

export default GalleryLightbox;