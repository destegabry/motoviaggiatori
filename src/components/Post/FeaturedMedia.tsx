import React from 'react';
import { useTheme } from '@emotion/react';
import { Post } from '../../entities/Post';
import { Picture } from '../Picture';

type FeaturedMediaProps = {
  post: Post;
};

export default function FeaturedMedia(props: FeaturedMediaProps): JSX.Element {
  const { post } = props;
  const theme = useTheme();

  const width = theme.components.container.maxWidth - theme.spacing(2);
  const smWidth = theme.breakpoints.values.sm - theme.spacing(2);

  if (post.frontmatter.featured_image) {
    return (
      <Picture
        src={post.frontmatter.featured_image}
        alt=""
        width={width}
        height={width / 2}
        responsive={[
          {
            key: 'sm',
            width: smWidth,
            height: smWidth / 2,
          },
        ]}
        css={(theme) => ({
          marginTop: theme.spacing(4),
        })}
      />
    );
  }
  return <></>;
}
