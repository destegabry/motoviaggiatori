import { graphql, useStaticQuery } from 'gatsby';

type UseSiteMetadata = {
  siteUrl: string;
  repositoryUrl: string;
  name: string;
  version: string;
  description: string;
  title: string;
  language: string;
  languageCode: string;
};

export const useSiteMetadata = (): UseSiteMetadata => {
  const { site } = useStaticQuery(
    graphql`
      query SiteMetaData {
        site {
          siteMetadata {
            siteUrl
            repositoryUrl
            name
            version
            description
            title
            language
            languageCode
          }
        }
      }
    `
  );
  return site.siteMetadata as UseSiteMetadata;
};
