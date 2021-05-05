import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { Layout } from '../components/Layout';
import PostList from '../components/Post/PostList';
import { Post } from '../entities';

type CategoryPageProps = PageProps<{
  markdownRemark: {
    frontmatter: {
      title: string;
    };
    html: string;
  };
  allFile: {
    edges: Array<{
      node: {
        childMarkdownRemark: Post;
      };
    }>;
  };
}>;

export default function CategoryPage({ data }: CategoryPageProps): JSX.Element {
  const category = data.markdownRemark.frontmatter;
  return (
    <Layout>
      <h1>{category.title}</h1>
      {data.markdownRemark.html && <section dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />}
      <PostList posts={data.allFile.edges.map(({ node }) => node.childMarkdownRemark)} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query CategoryByPath($id: String!) {
    markdownRemark(frontmatter: { path: { eq: $id } }) {
      frontmatter {
        title
      }
      html
    }
    allFile(
      sort: { fields: childMarkdownRemark___frontmatter___date, order: DESC }
      filter: {
        childMarkdownRemark: { frontmatter: { categories: { elemMatch: { frontmatter: { path: { eq: $id } } } } } }
        sourceInstanceName: { eq: "blog" }
      }
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
