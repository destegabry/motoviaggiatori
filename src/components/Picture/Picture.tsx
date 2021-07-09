import React from 'react';
import styled from '@emotion/styled';
import { Breakpoint, breakpoints } from '../../utils/breakpoints';

export type Size = {
  height: number;
  width: number;
};

export type PictureProps = Size & {
  alt: string;
  src: string;
  caption?: string;
  className?: string;
  responsive?: Array<Size & { min?: Breakpoint; max?: Breakpoint }>;
  resolutions?: Array<number>;
  fit?: boolean;
};

function createSrcSet(
  src: string,
  width: number,
  height: number,
  resolutions: Array<number> = [1, 2],
  fit?: boolean
): string {
  return resolutions
    ?.map((resolution) => {
      const params = new URLSearchParams({
        nf_resize: fit ? 'fit' : 'smartcrop',
        w: `${width * resolution}`,
        h: `${height * resolution}`,
      });

      return `${src}?${params} ${resolution}x`;
    })
    .join(', ');
}

const PictureWrapper = styled.picture({
  display: 'block',
  height: 0,
  position: 'relative',
  overflow: 'hidden',

  '& > img': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

export default function Picture(props: PictureProps): JSX.Element {
  const { src, alt, caption, className, height, width, responsive, resolutions, fit } = props;

  return (
    <PictureWrapper
      itemProp="image"
      itemScope
      itemType="https://schema.org/ImageObject"
      className={className}
      css={{
        paddingTop: `${(height / width) * 100}%`,
        ...responsive?.reduce((style, { min, max, width, height }) => {
          let query = '';
          if (min && max) {
            query = breakpoints.between(min, max);
          } else if (min) {
            breakpoints.up(min);
          } else if (max) {
            breakpoints.down(max);
          }
          return {
            ...style,
            [query]: { paddingTop: `${(height / width) * 100}%` },
          };
        }, {}),
      }}
    >
      {responsive?.map(({ min, max, width, height }, index) => {
        const constraints: string[] = [];
        if (min) {
          constraints.push(breakpoints.minWidthConstraint(breakpoints.values[min]));
        }
        if (max) {
          constraints.push(breakpoints.maxWidthConstraint(breakpoints.values[max]));
        }
        return (
          <source
            key={index}
            media={constraints.join(' and ')}
            srcSet={createSrcSet(src, width, height, resolutions, fit)}
          />
        );
      })}
      <source srcSet={createSrcSet(src, width, height)} />
      <img src={src} alt={alt} loading="lazy" />
      {caption && <figcaption>{caption}</figcaption>}
    </PictureWrapper>
  );
}
