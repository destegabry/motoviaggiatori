import { useStaticQuery, graphql } from "gatsby"

export default () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query AllFeaturedPosts {
        allMarkdownRemark(
          filter: {
            frontmatter: {
              featured_post: {
                eq: true
              }
            }
          }
          sort: {
            fields: frontmatter___date
            order: DESC
          }
        ) {
          edges {
            node {
              id
              frontmatter {
                title
                slug
                excerpt
                featured_post
              }
            }
          }
        }
      }
    `
  )
  return allMarkdownRemark.edges
}