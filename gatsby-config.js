require('dotenv').config();
const mime = require('mime');

const name = `MotoViaggiatori`;
const title = name;
const description = `Due ruote, infinite emozioni`;
const language = `it`;
const languageCode = `it_IT`;
const colors = require('./src/utils/colors.js');
const siteUrl = `https://motoviaggiatori.it`;
const { version, repository } = require('./package.json');

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
    languageCode
  },
  plugins: [
    `gatsby-plugin-remove-fingerprints`, // Fingerprints are not needed on Netlify
    `gatsby-plugin-emotion`,
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
    }, {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/categories`,
        name: `categories`,
      },
    }, {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/tags`,
        name: `tags`,
      },
    }, {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/authors`,
        name: `authors`,
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
          `gatsby-remark-embed-video`,
          `gatsby-remark-responsive-iframe`,
          `gatsby-remark-smartypants`,
          `gatsby-remark-autolink-headers`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: name,
        short_name: name,
        start_url: `/`,
        background_color: colors.primary.main,
        theme_color: colors.primary.main,
        display: `minimal-ui`,
        icon: `static/icons/motoviaggiatori_helmet.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [process.env.GOOGLE_ANALYTICS_TRACKING_ID],
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-netlify`, // make sure to keep it last in the array
  ],
  mapping: {
    'MarkdownRemark.frontmatter.author': `MarkdownRemark.frontmatter.path`,
    'MarkdownRemark.frontmatter.categories': `MarkdownRemark.frontmatter.path`,
    'MarkdownRemark.frontmatter.tags': `MarkdownRemark.frontmatter.path`,
  },
}
