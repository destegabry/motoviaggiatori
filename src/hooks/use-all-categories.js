import { useStaticQuery, graphql } from "gatsby"

export default () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query AllCategories {
        allMarkdownRemark(filter: {
          fields: {sourceInstanceName:{eq:"category"}}
        }) {
          edges {
            node {
              frontmatter {
                name
                slug
              }
            }
          }
        }
      }
    `
  )
  return allMarkdownRemark.edges
}