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
    excerpt: string;
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
    <Layout title={category.title} description={data.markdownRemark.excerpt}>
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
      excerpt
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
            ...PostPreviewData
          }
        }
      }
    }
  }
`;
