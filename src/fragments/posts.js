import { graphql } from 'gatsby'

export const postPreviewData = graphql`
  fragment PostPreviewData on MarkdownRemark {
    frontmatter {
      title
      slug
      date
      modified
      excerpt
      ...AuthorPreview
      ...CategoriesPreview
      featured_youtube
      featured_image {
        publicURL
        childImageSharp {
          ...ThumbnailWide,
          ...ThumbnailSquare
        }
      }
    }
  }
`

export const postData = graphql`
  fragment PostData on MarkdownRemark {
    html
    tableOfContents(
      pathToSlugField: "frontmatter.slug"
      maxDepth: 2
    )
    frontmatter {
      slug
      title
      date
      excerpt
      opening
      attributes {
        key
        value
      }
      ...CategoriesPreview
      categories {
        frontmatter {
          disclaimer
        }
      }
      ...TagsPreview
      author {
        ...AuthorData
        frontmatter {
          slug
        }
      }
      featured_youtube
      ...PostFeaturedImage
    }
  }
`