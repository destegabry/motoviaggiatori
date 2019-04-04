import { useStaticQuery, graphql } from "gatsby"

export const useAllPosts = () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query AllPosts {
        allMarkdownRemark(
          filter: {
            fields: {sourceInstanceName:{eq:"post"}}
          }
          sort: {
            fields: frontmatter___date
            order: DESC
          }
        ) {
          edges {
            node {
              frontmatter {
                title
                slug
                date
              }
            }
          }
        }
      }
    `
  )
  return allMarkdownRemark.edges
}