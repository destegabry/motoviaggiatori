import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { theme } from '../../utils/theme';

type GalleryProps = {
  images: Array<HTMLImageElement>;
};

export default function Gallery({ images }: GalleryProps): JSX.Element {
  return (
    <Swiper
      slidesPerView={'auto'}
      centeredSlides={true}
      spaceBetween={8}
      pagination={{ clickable: true }}
      keyboard={{ enabled: true, onlyInViewport: true }}
      css={{
        marginTop: '3em',
        position: 'relative',
        left: 'calc(-50vw + 50%)',
        width: '100vw',

        '.swiper-slide': {
          width: 'auto',
        },

        picture: {
          position: 'relative',
          display: 'block',
        },
        img: {
          maxWidth: `calc(100vw - ${theme.spacing(2)}px)`,
        },
        figcaption: {
          ...theme.typography.caption,
          position: 'absolute',
          padding: theme.spacing(1),
          left: 0,
          right: 0,
        },

        [theme.breakpoints.down('sm')]: {
          height: `calc(${theme.components.gallery.smHeight}px + 4em)`,

          img: {
            maxHeight: theme.components.gallery.smHeight,
          },

          figcaption: {
            top: theme.components.gallery.smHeight,
          },
        },
        [theme.breakpoints.up('sm')]: {
          height: `calc(${theme.components.gallery.height}px + 4em)`,

          img: {
            maxHeight: theme.components.gallery.height,
          },

          figcaption: {
            top: theme.components.gallery.height,
          },
        },
      }}
    >
      {Array.from(images).map((img, index) => (
        <SwiperSlide key={index}>
          <picture>
            <img src={img.src} alt={img.alt} title={img.title} />
            {img.title && <figcaption>{img.title}</figcaption>}
          </picture>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
