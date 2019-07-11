import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql, withPrefix } from 'gatsby'

function SEO({ description, meta, keywords, title, children, image }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={({ site: { siteMetadata } }) => {
        const metaDescription =description || siteMetadata.description
        const parsedTitle = title ? `${title} | ${siteMetadata.title}` : `${siteMetadata.title} | ${siteMetadata.description}`;
        let opengraph = [
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
            content: image ? image.publicUrl : withPrefix('/images/motoviaggiatori_logo.png')
          }
        ];

        if (!image) {
          opengraph = opengraph.concat([
            {
              property: `og:image:width`,
              content: 910
            },
            {
              property: `og:image:height`,
              content: 512
            }
          ]);
        } else if(image.childImageSharp && image.childImageSharp.original) {
          opengraph = opengraph.concat([
            {
              property: `og:image:width`,
              content: image.childImageSharp.original.width
            },
            {
              property: `og:image:height`,
              content: image.childImageSharp.original.height
            }
          ]);
        }

        return (
          <Helmet
            htmlAttributes={{
              lang: siteMetadata.language,
            }}
            title={parsedTitle}
            meta={[
              {
                name: `description`,
                content: metaDescription,
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
              .concat(meta)
              .concat(opengraph)}
          >
            {children}
          </Helmet>
        )
      }}
    />
  )
}

SEO.defaultProps = {
  meta: [],
  keywords: [],
}

SEO.propTypes = {
  description: PropTypes.string,
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
        language
      }
    }
  }
`
