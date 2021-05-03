import React from 'react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { graphql, Link, PageProps } from 'gatsby';
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
    <>
      {data.allFile.edges.map(({ node: { childMarkdownRemark } }) => (
        <article key={childMarkdownRemark.frontmatter.path} itemScope itemType="http://schema.org/Article">
          <h3>
            <Link to={childMarkdownRemark.frontmatter.path}>{childMarkdownRemark.frontmatter.title}</Link>
          </h3>
          <PostMeta post={childMarkdownRemark} />
          {childMarkdownRemark.frontmatter.excerpt && (
            <section
              dangerouslySetInnerHTML={{ __html: childMarkdownRemark.frontmatter.excerpt }}
              itemProp="articleBody"
            />
          )}
        </article>
      ))}
    </>
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
