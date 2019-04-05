import { graphql } from 'gatsby'

export const categoriesPreview = graphql`
  fragment CategoriesPreview on MarkdownRemarkFrontmatter {
    categories {
      frontmatter {
        name
        slug
      }
    }
  }
`