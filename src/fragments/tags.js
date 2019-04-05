import { graphql } from 'gatsby'

export const tagsPreview = graphql`
  fragment TagsPreview on MarkdownRemarkFrontmatter {
    tags {
      frontmatter {
        name
        slug
      }
    }
  }
`