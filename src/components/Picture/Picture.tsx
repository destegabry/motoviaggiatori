import React from 'react';

type PictureProps = {
  alt: string;
  src: string;
} & (
  | {
      height: number;
      width?: number;
    }
  | {
      height?: number;
      width: number;
    }
);

export default function Picture({ src, alt, height, width }: PictureProps): JSX.Element {
  const nf_resize = height && width ? 'smartcrop' : 'fit';
  const params1x = new URLSearchParams({ nf_resize });
  const params2x = new URLSearchParams({ nf_resize });
  const params3x = new URLSearchParams({ nf_resize });
  if (width) {
    params1x.append('w', `${width}`);
    params2x.append('w', `${width * 2}`);
    params3x.append('w', `${width * 3}`);
  }
  if (height) {
    params1x.append('h', `${height}`);
    params2x.append('h', `${height * 2}`);
    params3x.append('h', `${height * 3}`);
  }
  return (
    <picture itemProp="image" itemScope itemType="https://schema.org/ImageObject">
      <source
        srcSet={`
          ${src}?${params2x} 2x,
          ${src}?${params3x} 3x
        `}
      />
      <img src={`${src}?${params1x}`} alt={alt} width={width} height={height} />
      {width && <meta itemProp="width" content={`${width}`} />}
      {height && <meta itemProp="height" content={`${height}`} />}
    </picture>
  );
}
