import React from 'react';
import { graphql, PageProps } from 'gatsby';

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
    <>
      <h1>{category.title}</h1>
      <section dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      <pre>{JSON.stringify({ data, location }, null, 2)}</pre>
    </>
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
