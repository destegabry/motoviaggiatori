import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import he from 'he'

import LogoRaster from '../images/motoviaggiatori_logo.png'

function SEO({ description, lang, meta, keywords, title, children, image }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription = he.decode(description || data.wordpressSiteMetadata.description)
        const parsedTitle = he.decode(title);
        const previewImage = image || data.site.siteMetadata.siteUrl + LogoRaster;

        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={parsedTitle}
            titleTemplate={`%s | ${data.wordpressSiteMetadata.name}`}
            meta={[
              {
                name: `description`,
                content: metaDescription,
              },
              {
                property: `og:title`,
                content: parsedTitle,
              },
              {
                property: `og:description`,
                content: metaDescription,
              },
              {
                property: `og:type`,
                content: `website`,
              },
              {
                propert: `og:image`,
                content: previewImage
              },
              {
                name: `twitter:card`,
                content: `summary`,
              },
              {
                name: `twitter:title`,
                content: parsedTitle,
              },
              {
                name: `twitter:description`,
                content: metaDescription,
              },
            ]
              .concat(
                keywords.length > 0
                  ? {
                      name: `keywords`,
                      content: keywords.join(`, `),
                    }
                  : []
              )
              .concat(meta)}
          >
            {children}
          </Helmet>
        )
      }}
    />
  )
}

SEO.defaultProps = {
  lang: `it`,
  meta: [],
  keywords: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
}

export default SEO

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        siteUrl
      }
    }
    wordpressSiteMetadata {
      name
      description
    }
  }
`
