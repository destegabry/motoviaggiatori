import React from 'react';

type Size = {
  height: number;
  width: number;
};

type PictureProps = Size & {
  alt: string;
  src: string;
  className?: string;
  responsive?: Array<Size & { screenMaxWidth: number }>;
};

function createSrcSet(src: string, width: number, height: number, resolutions: Array<number> = [1, 2]): string {
  return resolutions
    ?.map((resolution) => {
      const params = new URLSearchParams({
        nf_resize: 'smartcrop',
        w: `${width * resolution}`,
        h: `${height * resolution}`,
      });

      return `${src}?${params} ${resolution}x`;
    })
    .join(', ');
}

export default function Picture(props: PictureProps): JSX.Element {
  const { src, alt, className, height, width, responsive } = props;

  return (
    <picture
      itemProp="image"
      itemScope
      itemType="https://schema.org/ImageObject"
      className={className}
      css={{ paddingTop: `${(height / width) * 100}%` }}
    >
      {responsive?.map(({ screenMaxWidth, width, height }) => (
        <source
          key={screenMaxWidth}
          media={`(max-width: ${screenMaxWidth}px)`}
          srcSet={createSrcSet(src, width, height)}
        />
      ))}
      <source srcSet={createSrcSet(src, width, height)} />
      <img src={src} alt={alt} width={width} height={height} />
      <meta itemProp="width" content={`${width}`} />
      <meta itemProp="height" content={`${height}`} />
    </picture>
  );
}
