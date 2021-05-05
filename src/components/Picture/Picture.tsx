import React from 'react';

type PictureProps = {
  alt: string;
  src: string;
  className?: string;
  height: number;
  width: number;
};

export default function Picture(props: PictureProps): JSX.Element {
  const { src, alt, className, height, width } = props;
  const nf_resize = height && width ? 'smartcrop' : 'fit';
  const params1x = new URLSearchParams({ nf_resize, w: `${width}`, h: `${height}` });
  const params2x = new URLSearchParams({ nf_resize, w: `${width * 2}`, h: `${height * 2}` });
  const params3x = new URLSearchParams({ nf_resize, w: `${width * 3}`, h: `${height * 3}` });

  return (
    <picture
      itemProp="image"
      itemScope
      itemType="https://schema.org/ImageObject"
      className={className}
      css={{ paddingTop: `${(height / width) * 100}%` }}
    >
      <source
        srcSet={`
          ${src}?${params2x} 2x,
          ${src}?${params3x} 3x
        `}
      />
      <img src={`${src}?${params1x}`} alt={alt} width={width} height={height} />
      <meta itemProp="width" content={`${width}`} />
      <meta itemProp="height" content={`${height}`} />
    </picture>
  );
}
