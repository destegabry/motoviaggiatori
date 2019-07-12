import { graphql } from 'gatsby'

export const authorData = graphql`
  fragment AuthorData on MarkdownRemark {
    html
    excerpt
    frontmatter {
      slug
      name
      ...AuthorAvatar
    }
  }
`

export const authorPreview = graphql`
  fragment AuthorPreview on MarkdownRemarkFrontmatter {
    author {
      frontmatter {
        name
        slug
      }
    }
  }
`