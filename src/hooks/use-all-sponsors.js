import { useStaticQuery, graphql } from "gatsby"

export default () => {
  const { allMarkdownRemark } = useStaticQuery(
    graphql`
      query AllSponsors {
        allMarkdownRemark(
          filter: {
            fields: {
              sourceInstanceName: { eq: "sponsor" }
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
                name
                image {
                  publicURL
                  childImageSharp {
                    fluid(
                      maxWidth: 120
                    ) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
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