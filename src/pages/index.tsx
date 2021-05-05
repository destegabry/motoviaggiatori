import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { Layout } from '../components/Layout';
import PostList from '../components/Post/PostList';
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
      <PostList posts={data.allFile.edges.map(({ node: { childMarkdownRemark } }) => childMarkdownRemark)} />
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
