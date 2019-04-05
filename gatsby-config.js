require('dotenv').config();
const mime = require('mime');

const name = `MotoViaggiatori`;
const title = name;
const description = `Due ruote, infinite emozioni`;
const language = `it`;
const colors = require('./src/utils/colors');
const siteUrl = `https://dbkw3cz129vwg.cloudfront.net`;
const {version} = require('./package.json');

module.exports = {
  siteMetadata: {
    siteUrl,
    name,
    version,
    description,
    title,
    image_url: `${siteUrl}/images/static/motoviaggiatori_icon_small.png`,
    language
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `post`,
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `author`,
        path: `${__dirname}/content/authors`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `tag`,
        path: `${__dirname}/content/tags`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `category`,
        path: `${__dirname}/content/categories`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `image`,
        path: `${__dirname}/content/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-external-links`,
            options: {
              target: `_blank`,
              rel: `noopener norefferer`
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1920,
              tracedSVG: true,
              showCaptions: true,
              linkImagesToOriginal: false
            },
          },
          `gatsby-remark-embed-video`,
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.5rem`,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: 90 // header collapsed height + 30px
            }
          },
        ],
      },
    },
    `gatsby-source-instance-name-for-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-svg`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: name,
        short_name: name,
        start_url: `/`,
        background_color: colors.palette.primary.main,
        theme_color: colors.palette.primary.main,
        display: `minimal-ui`,
        icon: `static/images/motoviaggiatori_icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-instagram-all`,
      options: {
        access_token: process.env.INSTAGRAM_ACCESS_TOKEN
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
                image_url
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.frontmatter.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.frontmatter.slug,
                  custom_elements: [],
                  enclosure: {
                    url: site.siteMetadata.siteUrl + edge.node.frontmatter.featured_image.publicURL,
                    type: mime.getType(edge.node.frontmatter.featured_image.ext)
                  }
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 10000
                  filter: { fields: { sourceInstanceName:{ eq: "post" } } }
                  sort: { fields: [frontmatter___date], order: DESC }
                ) {
                  edges {
                    node {
                      frontmatter {
                        slug
                        title
                        excerpt
                        date
                        featured_image {
                          publicURL
                          ext
                        }
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "MotoViaggiatori",
          },
        ]
      }
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: `motoviaggiatori`,
        protocol: `https`,
        hostname: siteUrl,
      },
    },
  ],
  mapping: {
    'MarkdownRemark.frontmatter.author': `MarkdownRemark.frontmatter.slug`,
    'MarkdownRemark.frontmatter.categories': `MarkdownRemark.frontmatter.slug`,
    'MarkdownRemark.frontmatter.tags': `MarkdownRemark.frontmatter.slug`,
  },
}
