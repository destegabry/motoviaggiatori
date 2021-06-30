require('dotenv').config();
const { version, repository } = require('./package.json');
const colors = require('./src/utils/colors.js');

const name = `MotoViaggiatori`;
const title = name;
const description = `Due ruote, infinite emozioni`;
const language = `it`;
const languageCode = `it_IT`;
const siteUrl = `https://motoviaggiatori.it`;

module.exports = {
  siteMetadata: {
    siteUrl,
    repositoryUrl: repository.url,
    name,
    version,
    description,
    title,
    image_url: `${siteUrl}/images/static/motoviaggiatori_icon_small.png`,
    language,
    languageCode,
  },
  plugins: [
    `gatsby-plugin-remove-fingerprints`, // Fingerprints are not needed on Netlify
    `gatsby-plugin-emotion`,
    `gatsby-plugin-fontawesome-css`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-react-svg`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/categories`,
        name: `categories`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/tags`,
        name: `tags`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/authors`,
        name: `authors`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/pages`,
        name: `pages`,
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
              rel: `noopener noreferrer`,
            },
          },
          `gatsby-remark-embed-video`,
          `gatsby-remark-responsive-iframe`,
          `gatsby-remark-smartypants`,
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-image-galleries`,
            options: {
              // TODO: use `theme` as soon as `gatsby-plugin-ts-config@2` is released
              responsive: [
                { mediaQuery: `(min-width: 600px)`, height: 500 },
                { mediaQuery: `(max-width: 599.95px)`, height: 250 },
              ],
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: name,
        short_name: name,
        start_url: `/`,
        background_color: colors.secondary.main,
        theme_color: colors.secondary.main,
        display: `minimal-ui`,
        icon: `static/icons/motoviaggiatori_icon.png`,
        icons: [
          {
            src: `static/icons/motoviaggiatori_apple_512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [process.env.GOOGLE_ANALYTICS_TRACKING_ID],
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
            serialize: ({ query: { allFile } }) => {
              return allFile.edges.map(
                ({
                  node: {
                    childMarkdownRemark: { frontmatter },
                  },
                }) => ({
                  title: frontmatter.title,
                  description: frontmatter.excerpt,
                  date: frontmatter.date,
                  url: `${siteUrl}${frontmatter.path}`,
                  guid: `${siteUrl}${frontmatter.path}`,
                  custom_elements: [],
                  enclosure: {
                    url: `${siteUrl}${frontmatter.featured_image}?nf_resize=fit&h=480`,
                    type: `image/jpg`,
                  },
                })
              );
            },
            query: `
              {
                allFile(
                  filter: { sourceInstanceName: { eq: "blog" } }
                  sort: { fields: [childMarkdownRemark___frontmatter___date], order: DESC }
                ) {
                  edges {
                    node {
                      childMarkdownRemark {
                        frontmatter {
                          path
                          title
                          excerpt
                          date
                          featured_image
                        }
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'MotoViaggiatori',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: require('./src/utils/algolia-queries'),
      },
    },
    `gatsby-plugin-netlify`, // make sure to keep it last in the array
  ],
  mapping: {
    'MarkdownRemark.frontmatter.author': `MarkdownRemark.frontmatter.path`,
    'MarkdownRemark.frontmatter.categories': `MarkdownRemark.frontmatter.path`,
    'MarkdownRemark.frontmatter.tags': `MarkdownRemark.frontmatter.path`,
  },
};
