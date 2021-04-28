import React from 'react';
import { graphql, PageProps } from 'gatsby';

type TagPageProps = PageProps<{
  markdownRemark: {
    frontmatter: {
      title: string;
    };
    html: string;
  };
}>;

export default function Tag({ data, location }: TagPageProps): JSX.Element {
  const tag = data.markdownRemark.frontmatter;
  return (
    <>
      <h1>{tag.title}</h1>
      <section dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      <pre>{JSON.stringify({ data, location }, null, 2)}</pre>
    </>
  );
}

export const pageQuery = graphql`
  query TagById($id: String!) {
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
