import React from 'react';
import { useTheme } from '@emotion/react';
import { Post } from '../../entities/Post';
import { Breakpoint } from '../../utils/breakpoints';
import { Picture, Size } from '../Picture';
import YouTubeVideo from './YouTubeVideo';

type FeaturedMediaProps = {
  post: Post;
  size?: Size;
  responsive?: Array<Size & { min?: Breakpoint; max?: Breakpoint }>;
  className?: string;
};

export default function FeaturedMedia(props: FeaturedMediaProps): JSX.Element {
  const { post, size, responsive, className } = props;
  const theme = useTheme();

  const width = theme.components.container.maxWidth - theme.spacing(2);
  const smWidth = theme.breakpoints.values.sm - theme.spacing(2);
  if (post.frontmatter.featured_youtube) {
    return <YouTubeVideo id={post.frontmatter.featured_youtube} className={className} />;
  }

  if (post.frontmatter.featured_image) {
    return (
      <Picture
        src={post.frontmatter.featured_image}
        alt=""
        width={size?.width || width}
        height={size?.height || Math.round((width / 16) * 9)}
        responsive={
          responsive || [
            {
              max: 'sm',
              width: smWidth,
              height: Math.round((smWidth / 16) * 9),
            },
          ]
        }
        className={className}
      />
    );
  }
  return <></>;
}
