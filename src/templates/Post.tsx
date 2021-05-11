import React from 'react';
import { graphql, Link, PageProps } from 'gatsby';
import { Layout } from '../components/Layout';
import { Picture } from '../components/Picture';
import { PostMeta } from '../components/Post';
import { Post } from '../entities';

type PostPageProps = PageProps & {
  data: {
    markdownRemark: Post;
  };
};

export default function PostPage({ data }: PostPageProps): JSX.Element {
  const post = data.markdownRemark.frontmatter;
  return (
    <Layout title={post.title} description={post.excerpt} image={post.featured_image}>
      <div itemProp="blogPost" itemScope itemType="https://schema.org/BlogPosting">
        <h1 itemProp="name headline">{post.title}</h1>
        <PostMeta post={data.markdownRemark} />
        {post.featured_image && (
          <Picture
            src={post.featured_image}
            alt=""
            width={884}
            height={442}
            css={(theme) => ({
              marginTop: theme.spacing(4),
            })}
          />
        )}
        {data.markdownRemark.html && (
          <section dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} itemProp="articleBody" />
        )}
        {post.tags && (
          <div>
            <h4>Tags</h4>
            <ul
              itemProp="keywords"
              css={(theme) => ({
                padding: 0,
                margin: theme.spacing(-1 / 2),
                display: 'flex',
                flexWrap: 'wrap',

                li: {
                  listStyle: 'none',
                  margin: theme.spacing(1 / 2),

                  a: {
                    ...theme.typography.caption,
                    color: theme.palette.secondary.contrastText,
                    background: theme.palette.secondary.main,
                    display: 'block',
                    borderRadius: theme.spacing(4),
                    paddingLeft: theme.spacing(2),
                    paddingRight: theme.spacing(2),
                    paddingTop: theme.spacing(1 / 2),
                    paddingBottom: theme.spacing(1),
                    textDecoration: 'none',

                    '&:hover': {
                      background: theme.palette.primary.main,
                    },
                  },
                },
              })}
            >
              {post.tags.map(({ frontmatter: { title, path } }) => (
                <li key={path}>
                  <Link to={`/tag/${path}`} rel="tag" title={`Guarda tutti i post con il tag ${title}`}>
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query BlogPostById($id: String!, $previousPostId: String, $nextPostId: String) {
    markdownRemark(id: { eq: $id }) {
      ...PostPreviewData
      html
      frontmatter {
        tags {
          frontmatter {
            path
            title
          }
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      frontmatter {
        path
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      frontmatter {
        path
        title
      }
    }
  }
`;
