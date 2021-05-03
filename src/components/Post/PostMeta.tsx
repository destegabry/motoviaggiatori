import React from 'react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { Link } from 'gatsby';
import { Post } from '../../entities/Post';

type PostMetaProps = {
  post: Post;
};

export default function PostMeta(props: PostMetaProps): JSX.Element {
  const { post } = props;
  return (
    <div
      css={{
        '> span + span:before': {
          content: '" ~ "',
        },
      }}
    >
      {post.frontmatter.date && (
        <span>
          <time dateTime={post.frontmatter.date} itemProp="datePublished" {...{ content: post.frontmatter.date }}>
            {format(new Date(post.frontmatter.date), 'dd MMM yyyy', { locale: it })}
          </time>
        </span>
      )}
      {post.frontmatter.author && (
        <span>
          <Link to={`/autore/${post.frontmatter.author.frontmatter.path}`}>
            {post.frontmatter.author.frontmatter.title}
          </Link>
        </span>
      )}
      {post.frontmatter.categories &&
        post.frontmatter.categories.map((category) => (
          <span key={category.frontmatter.path}>
            <Link to={`/categoria/${category.frontmatter.path}`}>{category.frontmatter.title}</Link>
          </span>
        ))}
    </div>
  );
}
