import React from 'react';
import { graphql } from 'gatsby';

export default function Post(props: unknown): JSX.Element {
  return <pre>{JSON.stringify({ props }, null, 2)}</pre>;
}

export const pageQuery = graphql`
  query BlogPostById($id: String!, $previousPostId: String, $nextPostId: String) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        path
        title
        date(formatString: "MMMM DD, YYYY")
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
