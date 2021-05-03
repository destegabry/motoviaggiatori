import React from 'react';
import { graphql, Link, PageProps } from 'gatsby';
import { Layout } from '../components/Layout';
import { Picture } from '../components/Picture';
import { PostMeta } from '../components/Post';
import { Post } from '../entities';

type HomeProps = PageProps<{
  allFile: {
    edges: Array<{
      node: {
        childMarkdownRemark: Post;
      };
    }>;
  };
}>;

export default function Home({ data }: HomeProps): JSX.Element {
  return (
    <Layout>
      <div
        css={(theme) => ({
          article: {
            display: 'flex',
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(4),
            fontSize: '.8em',
          },
          picture: {
            flexShrink: 0,
            marginRight: theme.spacing(4),
          },
          h3: {
            marginTop: 0,
            marginBottom: theme.spacing(1),
          },
          '.post-meta': {
            marginBottom: theme.spacing(1),
          },
        })}
      >
        {data.allFile.edges.map(({ node: { childMarkdownRemark } }) => (
          <article
            key={childMarkdownRemark.frontmatter.path}
            itemProp="blogPost"
            itemScope
            itemType="https://schema.org/BlogPosting"
          >
            {childMarkdownRemark.frontmatter.featured_image && (
              <Picture src={childMarkdownRemark.frontmatter.featured_image} alt="" height={160} width={160} />
            )}
            <div>
              <h3 itemProp="name headline">
                <Link to={childMarkdownRemark.frontmatter.path} itemProp="mainEntityOfPage url">
                  {childMarkdownRemark.frontmatter.title}
                </Link>
              </h3>
              <PostMeta post={childMarkdownRemark} />
              {childMarkdownRemark.frontmatter.excerpt && (
                <section
                  dangerouslySetInnerHTML={{ __html: childMarkdownRemark.frontmatter.excerpt }}
                  itemProp="abstract"
                />
              )}
            </div>
          </article>
        ))}
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query HomePage {
    allFile(
      sort: { fields: [childMarkdownRemark___frontmatter___date], order: DESC }
      filter: { sourceInstanceName: { eq: "blog" } }
      limit: 10
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              date
              path
              author {
                frontmatter {
                  path
                  title
                }
              }
              categories {
                frontmatter {
                  path
                  title
                }
              }
              excerpt
              featured_image
              title
            }
          }
        }
      }
    }
  }
`;
