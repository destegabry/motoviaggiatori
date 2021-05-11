import React from 'react';
import { format } from 'date-fns';
import locale from 'date-fns/locale/it';
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

        a: {
          textDecorationThickness: 2,
        },
      }}
    >
      {post.frontmatter.date && (
        <span>
          <time dateTime={post.frontmatter.date} itemProp="datePublished" {...{ content: post.frontmatter.date }}>
            {format(new Date(post.frontmatter.date), 'dd MMM yyyy', { locale })}
          </time>
        </span>
      )}
      {post.frontmatter.author && (
        <span itemProp="author" itemScope itemType="https://schema.org/Person">
          <Link
            to={`/autore/${post.frontmatter.author.frontmatter.path}`}
            title={`Guarda tutti i post di ${post.frontmatter.author.frontmatter.title}`}
            itemProp="url"
            rel="author"
          >
            <span itemProp="name">{post.frontmatter.author.frontmatter.title}</span>
          </Link>
        </span>
      )}
      {post.frontmatter.categories && (
        <span itemProp="keywords">
          {post.frontmatter.categories.map((category, index, list) => (
            <span key={category.frontmatter.path}>
              <Link
                to={`/categoria/${category.frontmatter.path}`}
                title={`Guarda i post nella categoria ${category.frontmatter.title}`}
                rel="category"
              >
                {category.frontmatter.title}
              </Link>
              {index < list?.length - 1 && ', '}
            </span>
          ))}
        </span>
      )}
    </div>
  );
}
