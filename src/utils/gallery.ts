import { icon } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft, faChevronRight, faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const sliderClassName = 'md-gallery__slider';
const sliderSwipingClassName = 'md-gallery__slider_swiping';
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

export async function Gallery(element: Element): Promise<void> {
  const slider = element.querySelector(`.${sliderClassName}`) as HTMLElement;
  const slidesCount = element.querySelectorAll('picture').length;
  let currentSlideIndex = 0;
  let translateX = 0;

  const loader = document.createElement('div');
  loader.className = loaderClassName;
  loader.innerHTML = icon(faCircleNotch).html[0];
  element.append(loader);

  await Promise.all(Array.from(slider.querySelectorAll('img')).map(imageOnLoad));

  loader.remove();

  const prevButton = document.createElement('div');
  prevButton.className = `${navClassName} ${navPrevClassName}`;
  prevButton.innerHTML = icon(faChevronLeft).html[0];

  const nextButton = document.createElement('div');
  nextButton.className = `${navClassName} ${navNextClassName}`;
  nextButton.innerHTML = icon(faChevronRight).html[0];

  const slideTo = (index: number) => {
    const slide = slider?.querySelector<HTMLElement>(`picture:nth-child(${index + 1})`);

    if (slide) {
      translateX = (window.innerWidth - slide.clientWidth) / 2 - slide.offsetLeft;
      slider.style.transform = `translateX(${translateX}px)`;
      currentSlideIndex = index;
    }

    if (currentSlideIndex === 0) {
      prevButton.classList.add(navDisabledClassName);
    } else {
      prevButton.classList.remove(navDisabledClassName);
    }

    if (currentSlideIndex === slidesCount - 1) {
      nextButton.classList.add(navDisabledClassName);
    } else {
      nextButton.classList.remove(navDisabledClassName);
    }
  };

  window.addEventListener('resize', () => slideTo(currentSlideIndex));

  if (slidesCount > 1) {
    prevButton.onclick = () => slideTo(currentSlideIndex - 1);
    element.append(prevButton);

    nextButton.onclick = () => slideTo(currentSlideIndex + 1);
    element.append(nextButton);

    let swipeOrigin = 0;
    let swipeWidth = 0;

    const handleSwipeMove = (event: TouchEvent) => {
      event.preventDefault();
      swipeWidth = swipeOrigin - event.targetTouches[0].clientX;
      slider.style.transform = `translateX(${translateX - swipeWidth}px)`;
    };

    const handleSwipeEnd = (event: TouchEvent) => {
      event.preventDefault();
      slider.classList.remove(sliderSwipingClassName);
      if (Math.abs(swipeWidth) > window.innerWidth / 6) {
        slideTo(Math.max(0, Math.min(slidesCount - 1, currentSlideIndex + Math.sign(swipeWidth))));
      } else {
        slideTo(currentSlideIndex);
      }
      swipeOrigin = 0;
      swipeWidth = 0;
      slider.removeEventListener('touchmove', handleSwipeMove);
      slider.removeEventListener('touchend', handleSwipeEnd);
      slider.removeEventListener('touchcancel', handleSwipeEnd);
    };

    const handleSwipeStart = (event: TouchEvent) => {
      event.preventDefault();
      slider.classList.add(sliderSwipingClassName);
      swipeOrigin = event.targetTouches[0].clientX;
      slider.addEventListener('touchmove', handleSwipeMove);
      slider.addEventListener('touchend', handleSwipeEnd);
      slider.addEventListener('touchcancel', handleSwipeEnd);
    };

    slider.addEventListener('touchstart', handleSwipeStart);
  }

  slider.style.visibility = 'visible';
  slideTo(currentSlideIndex);
}
