import { icon } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft, faChevronRight, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import debounce from 'lodash.debounce';

const sliderClassName = 'md-gallery__slider';
const sliderAnimatedClassName = 'md-gallery__slider_animated';
const loaderClassName = 'md-gallery__loader';
const navClassName = 'md-gallery__nav';
const navPrevClassName = 'md-gallery__nav_prev';
const navNextClassName = 'md-gallery__nav_next';
const navDisabledClassName = 'md-gallery__nav_disabled';

const imageOnLoad = (image: HTMLImageElement): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    image.onload = () => resolve(image);
    image.onerror = reject;
  });

const getTouchFromEvent = (event: TouchEvent | MouseEvent): null | { x: number; y: number } => {
  if ('touches' in event && event.touches.length === 1) {
    return {
      x: event.touches[0].pageX,
      y: event.touches[1].pageY,
    };
  }
  if ('pageX' in event && 'pageY' in event) {
    return {
      x: event.pageX,
      y: event.pageY,
    };
  }
  return null;
};

export function Gallery(element: Element): { destroy: () => void } {
  const slider = element.querySelector(`.${sliderClassName}`) as HTMLElement;
  const slidesCount = element.querySelectorAll('picture').length;
  let maxTranslate = slider.clientWidth - window.innerWidth;
  let currentSlideIndex = 0;
  let translateX = 0;
  let swipeOrigin = { x: 0, y: 0 };
  let deltaX = 0;
  let deltaY = 0;
  let scrolling = false;

  const loader = document.createElement('div');
  loader.className = loaderClassName;
  loader.innerHTML = icon(faCircleNotch).html[0];
  element.append(loader);

  const prevButton = document.createElement('div');
  prevButton.className = `${navClassName} ${navPrevClassName}`;
  prevButton.innerHTML = icon(faChevronLeft).html[0];

  const nextButton = document.createElement('div');
  nextButton.className = `${navClassName} ${navNextClassName}`;
  nextButton.innerHTML = icon(faChevronRight).html[0];

  const translate = () => {
    slider.style.transform = `translate3d(${translateX}px, 0, 0)`;
  };

  const slide = () => {
    if (slider.clientWidth < window.innerWidth) {
      prevButton.style.visibility = 'hidden';
      nextButton.style.visibility = 'hidden';
      translateX = (window.innerWidth - slider.clientWidth) / 2;
      translate();
    } else {
      prevButton.style.visibility = 'visible';
      nextButton.style.visibility = 'visible';

      const slide = slider.querySelector<HTMLElement>(`picture:nth-child(${currentSlideIndex + 1})`);
      maxTranslate = slider.clientWidth - window.innerWidth;
      if (slide) {
        translateX = -Math.min(slide.offsetLeft, maxTranslate);
        translate();
      }
      if (currentSlideIndex === 0) {
        prevButton.classList.add(navDisabledClassName);
      } else {
        prevButton.classList.remove(navDisabledClassName);
      }
      if (currentSlideIndex === slidesCount - 1 || translateX === -maxTranslate) {
        nextButton.classList.add(navDisabledClassName);
      } else {
        nextButton.classList.remove(navDisabledClassName);
      }
    }
  };

  const prev = debounce(
    () => {
      currentSlideIndex = Math.max(0, currentSlideIndex - 1);
      slide();
    },
    100,
    { leading: true }
  );

  const next = debounce(
    () => {
      if (maxTranslate > translateX) {
        currentSlideIndex = Math.min(slidesCount - 1, currentSlideIndex + 1);
        slide();
      }
    },
    100,
    { leading: true }
  );

  const handleSwipeMove = (event: TouchEvent | MouseEvent) => {
    const touch = getTouchFromEvent(event);
    if (touch) {
      deltaX = swipeOrigin.x - touch.x;
      deltaY = swipeOrigin.y - touch.y;
      scrolling = Math.abs(deltaY) > Math.abs(deltaX);

      if (!scrolling && event.cancelable) {
        event.preventDefault();
        if (
          // Swipe only if there's something to show
          (deltaX > 0 && currentSlideIndex < slidesCount - 1) ||
          (deltaX < 0 && currentSlideIndex > 0)
        ) {
          slider.style.transform = `translate3d(${-Math.min(Math.max(0, deltaX - translateX), maxTranslate)}px, 0, 0)`;
        }
      }
    }
  };

  const handleSwipeEnd = () => {
    slider.classList.add(sliderAnimatedClassName);
    if (!scrolling) {
      if (Math.abs(deltaX) > 50) {
        if (deltaX < 0) {
          prev();
        } else {
          next();
        }
      }
      slide();
    }
    swipeOrigin = { x: 0, y: 0 };
    deltaX = 0;
    scrolling = false;
    slider.removeEventListener('touchmove', handleSwipeMove);
    slider.removeEventListener('mousemove', handleSwipeMove);
    slider.removeEventListener('touchend', handleSwipeEnd);
    slider.removeEventListener('mouseup', handleSwipeEnd);
    slider.removeEventListener('touchcancel', handleSwipeEnd);
    slider.removeEventListener('mouseleave', handleSwipeEnd);
  };

  const handleSwipeStart = (event: TouchEvent | MouseEvent) => {
    const touch = getTouchFromEvent(event);
    if (touch && slider.clientWidth > window.innerWidth) {
      swipeOrigin.x = touch.x;
      swipeOrigin.y = touch.y;
      slider.classList.remove(sliderAnimatedClassName);
      slider.addEventListener('touchmove', handleSwipeMove);
      slider.addEventListener('mousemove', handleSwipeMove);
      slider.addEventListener('touchend', handleSwipeEnd);
      slider.addEventListener('mouseup', handleSwipeEnd);
      slider.addEventListener('touchcancel', handleSwipeEnd);
      slider.addEventListener('mouseleave', handleSwipeEnd);
    }
  };

  if (slidesCount > 1) {
    prevButton.addEventListener('click', prev);
    element.append(prevButton);

    nextButton.addEventListener('click', next);
    element.append(nextButton);

    slider.addEventListener('touchstart', handleSwipeStart);
    slider.addEventListener('mousedown', handleSwipeStart);
  }

  const debouncedSlide = debounce(slide, 300);
  window.addEventListener('resize', debouncedSlide);

  Promise.all(Array.from(slider.querySelectorAll('img')).map(imageOnLoad)).then(() => {
    slide();
    requestAnimationFrame(() => {
      loader.remove();
      slider.style.visibility = 'visible';
      slider.classList.add(sliderAnimatedClassName);
    });
  });

  return {
    destroy: () => {
      window.removeEventListener('resize', debouncedSlide);
    },
  };
}
