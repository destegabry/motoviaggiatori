import { useStaticQuery, graphql } from "gatsby"

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            siteUrl,
            repositoryUrl
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