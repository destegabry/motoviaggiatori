import { graphql } from 'gatsby';

export const postPreviewData = graphql`
  fragment PostPreviewData on MarkdownRemark {
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
`;
