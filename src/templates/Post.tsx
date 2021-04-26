import React from 'react';
import { graphql, PageProps } from 'gatsby';

type PostPageProps = PageProps & {
  data: {
    markdownRemark: {
      frontmatter: {
        title: string;
        links: {
          title?: string;
          url: string;
        }[];
      };
      html: string;
    };
  };
};

export default function Post({ data, location }: PostPageProps): JSX.Element {
  const post = data.markdownRemark.frontmatter;
  return (
    <>
      <h1>{post.title}</h1>
      <section dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} itemProp="articleBody" />
    </>
  );
}

export const pageQuery = graphql`
  query BlogPostById($id: String!, $previousPostId: String, $nextPostId: String) {
    markdownRemark(id: { eq: $id }) {
      html
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
