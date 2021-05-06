import React from 'react';
import { Link } from 'gatsby';
import { Post } from '../../entities';
import { Picture } from '../Picture';
import { PostMeta } from '.';

type PostListProps = {
  posts: Array<Post>;
};

const pictureSize = {
  width: 240,
  height: 160,
};

export default function PostList({ posts }: PostListProps): JSX.Element {
  return (
    <div
      css={(theme) => ({
        article: {
          display: 'flex',
          marginTop: theme.spacing(2),
          marginBottom: theme.spacing(2),
          fontSize: '.8em',
        },
        h3: {
          marginTop: 0,
          marginBottom: theme.spacing(1),
        },
        '.post-meta': {
          marginBottom: theme.spacing(1),
        },
        '.image-wrapper': {
          flex: `0 0 ${pictureSize.width}px`,
          marginRight: theme.spacing(2),
          marginTop: theme.spacing(1),
        },
      })}
    >
      {posts.map((post) => (
        <article key={post.frontmatter.path} itemProp="blogPost" itemScope itemType="https://schema.org/BlogPosting">
          {post.frontmatter.featured_image && (
            <Link to={post.frontmatter.path} title={post.frontmatter.title} className="image-wrapper">
              <Picture src={post.frontmatter.featured_image} alt="" {...pictureSize} />
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
