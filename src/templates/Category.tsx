import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { Layout } from '../components/Layout';

type CategoryPageProps = PageProps<{
  markdownRemark: {
    frontmatter: {
      title: string;
    };
    html: string;
  };
}>;

export default function Category({ data, location }: CategoryPageProps): JSX.Element {
  const category = data.markdownRemark.frontmatter;
  return (
    <Layout>
      <h1>{category.title}</h1>
      <section dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      <pre>{JSON.stringify({ data, location }, null, 2)}</pre>
    </Layout>
  );
}

export const pageQuery = graphql`
  query CategoryById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        links {
          title
          url
        }
      }
      html
    }
  }
`;
