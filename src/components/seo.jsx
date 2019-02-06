import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

function SEO({ description, lang, meta, keywords, title }) {
  // Unescape HTML entities
  let parsedTitle = document.createElement('div');
  parsedTitle.innerHTML = title;
  parsedTitle = parsedTitle.innerText;
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription = description || data.wordpressSiteMetadata.description
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
                name: `twitter:card`,
                content: `summary`,
              },
              {
                name: `twitter:creator`,
                content: data.wordpressSiteMetadata.author,
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
          />
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
    wordpressSiteMetadata {
      name
      description
    }
  }
`
