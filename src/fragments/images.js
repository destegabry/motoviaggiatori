import { graphql } from 'gatsby'

export const thumbnailWide = graphql`
  fragment ThumbnailWide on ImageSharp {
    wide: fluid(
      maxWidth: 640,
      maxHeight: 360,
      cropFocus: CENTER
    ) {
      src
      srcSet
      aspectRatio
      sizes
    }
  }
`

export const thumbnailSquare = graphql`
  fragment ThumbnailSquare on ImageSharp {
    square: fluid(
      maxWidth: 80,
      maxHeight: 80,
      cropFocus: CENTER
    ) {
      src
      srcSet
      aspectRatio
      sizes
    }
  }
`

export const authorAvatar = graphql`
  fragment AuthorAvatar on MarkdownRemarkFrontmatter {
    avatar {
      publicURL
      childImageSharp {
        fluid(
          maxWidth: 300,
          maxHeight: 300,
          cropFocus: CENTER
        ) {
          src
          srcSet
          aspectRatio
          sizes
        }
      }
    }
  }
`

export const postFeaturedImage = graphql`
  fragment PostFeaturedImage on MarkdownRemarkFrontmatter {
    featured_image {
      publicURL
      childImageSharp {
        fluid(
          maxWidth: 1240,
          maxHeight: 620,
          cropFocus: CENTER
        ) {
          src
          srcSet
          aspectRatio
          sizes
        }
      }
    }
  }
`