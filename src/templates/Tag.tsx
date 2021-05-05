import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { Layout } from '../components/Layout';
import PostList from '../components/Post/PostList';
import { Post } from '../entities';

type TagPageProps = PageProps<{
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

export default function TagPage({ data }: TagPageProps): JSX.Element {
  const tag = data.markdownRemark.frontmatter;
  return (
    <Layout>
      <h1>{tag.title}</h1>
      {data.markdownRemark.html && <section dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />}
      <PostList posts={data.allFile.edges.map(({ node }) => node.childMarkdownRemark)} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query TagByPath($id: String!) {
    markdownRemark(frontmatter: { path: { eq: $id } }) {
      frontmatter {
        title
      }
      html
    }
    allFile(
      sort: { fields: childMarkdownRemark___frontmatter___date, order: DESC }
      filter: {
        childMarkdownRemark: { frontmatter: { tags: { elemMatch: { frontmatter: { path: { eq: $id } } } } } }
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
