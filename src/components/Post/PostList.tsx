import React from 'react';
import { useTheme } from '@emotion/react';
import { Link } from 'gatsby';
import { Post } from '../../entities';
import FeaturedMedia from './FeaturedMedia';
import PostMeta from './PostMeta';

type PostListProps = {
  posts: Array<Post>;
};

const pictureSize = { width: 240, height: (240 / 16) * 9 };

export default function PostList({ posts }: PostListProps): JSX.Element {
  const theme = useTheme();

  return (
    <div
      css={(theme) => ({
        article: {
          display: 'flex',
          marginTop: theme.spacing(2),
          marginBottom: theme.spacing(2),
          fontSize: '.8em',

          [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            marginBottom: theme.spacing(4),
          },
        },
        h3: {
          marginTop: 0,
          marginBottom: theme.spacing(1),

          a: {
            textDecoration: 'none',
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
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(2),
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
                    key: 'sm',
                    width: theme.breakpoints.values.sm - theme.spacing(2),
                    height: (theme.breakpoints.values.sm - theme.spacing(2)) / 2,
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
