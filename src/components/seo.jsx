import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql, withPrefix } from 'gatsby'
import he from 'he'
import stripHtml from 'string-strip-html'

function SEO({ description, lang, meta, keywords, title, children, image }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={({ site: { siteMetadata } }) => {
        const metaDescription = he.decode(stripHtml(description || siteMetadata.description))
        const parsedTitle = title ? `${he.decode(title)} | ${siteMetadata.title}` : `${siteMetadata.title} | ${siteMetadata.description}`;
        const previewImage = image || withPrefix('/images/motoviaggiatori_logo.png');

        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={parsedTitle}
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
                property: `og:image`,
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
  title: PropTypes.string,
}

export default SEO

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
