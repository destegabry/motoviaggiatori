import { useStaticQuery, graphql } from "gatsby"

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            siteUrl,
            name,
            version,
            description,
            title,
            language
          }
        }
      }
    `
  )
  return site.siteMetadata
}