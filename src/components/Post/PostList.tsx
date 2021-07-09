import React from 'react';
import { useTheme } from '@emotion/react';
import { Link } from 'gatsby';
import { Post } from '../../entities';
import FeaturedMedia from './FeaturedMedia';
import PostMeta from './PostMeta';

type PostListProps = {
  posts: Array<Post>;
};

const pictureSize = { width: 360, height: Math.round((360 / 16) * 9) };
const pictureSizeMd = { width: 240, height: Math.round((240 / 4) * 3) };

export default function PostList({ posts }: PostListProps): JSX.Element {
  const theme = useTheme();

  return (
    <div
      css={(theme) => ({
        article: {
          display: 'flex',
          marginTop: theme.spacing(2),
          marginBottom: theme.spacing(2),
          [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            marginBottom: theme.spacing(4),
          },
          [theme.breakpoints.up('sm')]: {
            fontSize: '.8em',
          },
        },
        h3: {
          marginTop: 0,
          marginBottom: theme.spacing(1),
          lineHeight: 1.6,
          a: {
            textDecoration: 'none',
          },
          [theme.breakpoints.up('sm')]: {
            fontSize: '1.1rem',
          },
        },
        '.post-meta': {
          marginBottom: theme.spacing(1),
        },
        '.picture-wrapper': {
          [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(1),
          },
          [theme.breakpoints.up('sm')]: {
            flex: `0 0 ${pictureSize.width}px`,
            marginRight: theme.spacing(2),
          },
          [theme.breakpoints.between('sm', 'md')]: {
            flexBasis: pictureSizeMd.width,
          },
        },
      })}
    >
      {posts.map((post) => (
        <article key={post.frontmatter.path} itemProp="blogPost" itemScope itemType="https://schema.org/BlogPosting">
          {post.frontmatter.featured_image && (
            <Link to={post.frontmatter.path} title={post.frontmatter.title} className="picture-wrapper">
              <FeaturedMedia
                post={post}
                size={pictureSize}
                responsive={[
                  {
                    max: 'sm',
                    width: theme.breakpoints.values.sm - theme.spacing(2),
                    height: (theme.breakpoints.values.sm - theme.spacing(2)) / 2,
                  },
                  {
                    min: 'sm',
                    max: 'md',
                    ...pictureSizeMd,
                  },
                ]}
              />
            </Link>
          )}
          <div>
            <h3 itemProp="name headline">
              <Link to={post.frontmatter.path} title="Leggi l'articolo" itemProp="mainEntityOfPage url">
                {post.frontmatter.title}
              </Link>
            </h3>
            <PostMeta post={post} />
            {post.frontmatter.excerpt && (
              <section dangerouslySetInnerHTML={{ __html: post.frontmatter.excerpt }} itemProp="description" />
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
