import React from 'react';
import YouTube from 'react-youtube';
import { ClassNames } from '@emotion/react';

type YouTubeVideoProps = {
  id: string;
  className?: string;
};

export default function YouTubeVideo(props: YouTubeVideoProps): JSX.Element {
  const { id, className } = props;

  return (
    <ClassNames>
      {({ css }) => (
        <YouTube
          videoId={id}
          opts={{ width: '100%', height: '100%' }}
          containerClassName={[
            css({
              width: '100%',
              height: 0,
              position: 'relative',
              paddingBottom: `${(9 / 16) * 100}%`,

              iframe: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              },
            }),
            className,
          ].join(' ')}
        />
      )}
    </ClassNames>
  );
}
