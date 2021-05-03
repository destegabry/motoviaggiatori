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
      className="post-meta"
      css={{
        '> span + span:before': {
          content: '"/"',
          marginLeft: '.25ch',
          marginRight: '.25ch',
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
        <span itemProp="author" itemScope itemType="https://schema.org/Person">
          <Link
            to={`/autore/${post.frontmatter.author.frontmatter.path}`}
            title={`Guarda tutti i post di ${post.frontmatter.author.frontmatter.title}`}
            itemProp="url"
          >
            <span itemProp="name">{post.frontmatter.author.frontmatter.title}</span>
          </Link>
        </span>
      )}
      {post.frontmatter.categories &&
        post.frontmatter.categories.map((category) => (
          <span key={category.frontmatter.path}>
            <Link
              to={`/categoria/${category.frontmatter.path}`}
              title={`Guarda tutti nella categoria ${category.frontmatter.title}`}
            >
              {category.frontmatter.title}
            </Link>
          </span>
        ))}
    </div>
  );
}
