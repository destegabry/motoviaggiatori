import ReactDOM from "react-dom";
import { css } from 'emotion'
import { SMALL_SCREEN_ONLY } from './breakpoints'
import {
  IconClose,
  IconArrowLeft,
  IconArrowRight
} from '../components/Icons'

const GalleryLightboxCSS = css`
  background: rgba(0, 0, 0, .95);
  display: flex;
  justify-content: center;
  align-items: center;
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
    align-items: center;
    position: relative;
    pointer-events: none;
    margin: 0;
    padding: 0 .5rem;
    min-width: 100%;
    width: 100%;

    img {
      height: auto!important;
      width: auto!important;
      position: static!important;
      max-height: 80vh;
      margin: 0;
    }

    &:not(.dragging) {
      transition: transform .1s;
    }
  }

  figcaption {
    color: white;
    font-size: .85rem;
    padding: .5rem .5rem 0;
  }

  .gallery-lightbox-viewport {
    display: flex;
    align-items: center;
    height: 95vh;
    width: 85vw;
  }

  .gallery-lightbox-controls {
    .control {
      cursor: pointer;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2rem;
      height: 4rem;
      width: 4rem;
    }

    svg {
      fill: white;
      height: 1.5rem;
      width: 1.5rem;
    }

    .control-next,
    .control-prev {
      top: 0;
      height: 100vh;

      ${SMALL_SCREEN_ONLY} {
        width: 2rem;
      }
    }

    .control-next {
      right: 0;
      background: linear-gradient(to right, rgba(0,0,0,0) 0%,rgba(0,0,0,.7) 100%);
    }

    .control-prev {
      left: 0;
      background: linear-gradient(to left, rgba(0,0,0,0) 0%,rgba(0,0,0,.7) 100%);
    }

    .control-close {
      top: 0;
      right: 0;
      z-index: 10;
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
  constructor(gallery, index) {
    this.gallery = gallery;

    this.close = this.close.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.onKeydown = this.onKeydown.bind(this);
    this.swipeStarted = this.swipeStarted.bind(this);
    this.swipeDrag = this.swipeDrag.bind(this);
    this.swipeEnded = this.swipeEnded.bind(this);

    this.container = document.createElement('div');
    this.container.classList.add(GalleryLightboxCSS);

    this.viewport = document.createElement('div');
    this.viewport.className = 'gallery-lightbox-viewport';

    this.gallery.items.forEach(item => {
      const figure = document.createElement('figure');
      const isFigure = item.element.tagName.toLowerCase() === 'figure';
      if (isFigure) {
        figure.appendChild(item.element.querySelector('img').cloneNode(true));
        figure.appendChild(item.element.querySelector('figcaption').cloneNode(true));
      } else {
        const img = item.element.cloneNode(true);
        img.style.transform = 'none';
        figure.appendChild(img);
      }
      this.viewport.appendChild(figure);
    })

    const controls = document.createElement('div');
    controls.className = 'gallery-lightbox-controls';

    const close = document.createElement('span');
    close.className = 'control control-close';
    close.addEventListener('click', this.close);
    ReactDOM.render(IconClose(), close);
    close.querySelector('svg').setAttribute('viewBox', '0 0 320 512'); // FIXME
    controls.appendChild(close);

    if (this.gallery.items.length > 1) {
      const next = document.createElement('span');
      next.className = 'control control-next';
      next.addEventListener('click', this.next);
      ReactDOM.render(IconArrowRight(), next);
      next.querySelector('svg').setAttribute('viewBox', '0 0 256 512'); // FIXME
      controls.appendChild(next);

      const prev = document.createElement('span');
      prev.className = 'control control-prev';
      ReactDOM.render(IconArrowLeft(), prev);
      prev.querySelector('svg').setAttribute('viewBox', '0 0 256 512'); // FIXME
      prev.addEventListener('click', this.prev);
      controls.appendChild(prev);
    }
    this.setItem(index);

    this.container.appendChild(this.viewport);
    this.container.appendChild(controls);

    document.addEventListener('keydown', this.onKeydown);

    this.viewport.addEventListener('touchstart', this.swipeStarted);
    this.viewport.addEventListener('touchmove', this.swipeDrag);
    this.viewport.addEventListener('touchend', this.swipeEnded);

    this.gallery.container.parentElement.appendChild(this.container);

    document.querySelector('body').classList.add('modal-open');
    document.querySelector('html').classList.add('modal-open');
  }

  onKeydown(event) {
    event.preventDefault();
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

  swipeStarted(event) {
    this.swipeOrigin = getEventOrigin(event);
  }

  swipeDrag(event) {
    if (this.swipeOrigin) {
      event.preventDefault();
      const currentSwipe = getEventOrigin(event);
      const dx = currentSwipe.x - this.swipeOrigin.x;
      const dy = currentSwipe.y - this.swipeOrigin.y;
      this.viewport.querySelectorAll('figure')
        .forEach((figure, index) => {
          figure.classList.add('dragging');
          if (Math.abs(dx) > Math.abs(dy)) {
            figure.style.transform = `translate(calc(-${this.currentIndex * 100}% + ${dx}px), 0)`;
          } else if(dy > 0 && index === this.currentIndex) {
            figure.style.transform = `
              translate(calc(-${this.currentIndex * 100}%), ${dy}px)
              rotate(${90 * dy / this.viewport.offsetHeight}deg)
            `;
            this.container.style.background = `rgba(0, 0, 0, ${0.95 - dy / this.viewport.offsetHeight})`;
          }
        });
    }
  }

  swipeEnded(event) {
    if (this.swipeOrigin) {
      event.preventDefault();
      const swipeEnd = getEventOrigin(event);
      const dx = swipeEnd.x - this.swipeOrigin.x;
      const dy = swipeEnd.y - this.swipeOrigin.y;

      if (dy > this.viewport.offsetHeight / 4 && Math.abs(dy) > Math.abs(dx)) {
        this.close();
      } else if(dx > this.viewport.offsetWidth / 3) {
        this.prev();
      } else if(dx < -this.viewport.offsetWidth / 3) {
        this.next();
      } else {
        this.viewport.querySelectorAll('figure')
          .forEach((figure) => {
            figure.style.transform = `translate(-${this.currentIndex * 100}%, 0)`;
            figure.classList.remove('dragging');
          });
        this.container.style.background = null;
      }

      this.swipeOrigin = null;
    }
  }

  setItem(index) {
    this.currentIndex = index;
    this.viewport.querySelectorAll('figure')
      .forEach(figure => {
        figure.classList.remove('dragging');
        figure.style.transform = `translateX(-${this.currentIndex * 100}%)`;
      })
  }

  next() {
    this.setItem(Math.min(
      this.currentIndex + 1,
      this.gallery.items.length - 1
    ));
  }

  prev() {
    this.setItem(Math.max(
      0,
      this.currentIndex - 1
    ));
  }

  close() {
    document.removeEventListener('keydown', this.onKeydown);
    document.querySelector('body').classList.remove('modal-open');
    document.querySelector('html').classList.remove('modal-open');

    this.viewport.removeEventListener('touchstart', this.swipeStarted);
    this.viewport.removeEventListener('touchmove', this.swipeDrag);
    this.viewport.removeEventListener('touchend', this.swipeEnded);
    this.container.parentElement.removeChild(this.container);
  }
}

export default GalleryLightbox;