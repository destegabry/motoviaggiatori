import { useStaticQuery, graphql } from "gatsby"

export default () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query AllBanners {
        allMarkdownRemark(
          filter: {
            fields: {
              sourceInstanceName: { eq: "banner" }
            }
          }
          sort: {
            fields: frontmatter___order
            order: ASC
          }
        ) {
          edges {
            node {
              frontmatter {
                url
                title
                subtitle
                cta
                css
                logo {
                  publicURL
                }
              }
            }
          }
        }
      }
    `
  )
  return allMarkdownRemark.edges
}