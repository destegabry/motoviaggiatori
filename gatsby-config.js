require('dotenv').config();

const name = `MotoViaggiatori`;
const title = name;
const description = `Due ruote, infinite emozioni`;
const language = `it`;
const colors = require('./src/utils/colors');
const siteUrl = `https://motoviaggiatori.it`;
const {version} = require('./package.json');

module.exports = {
  siteMetadata: {
    siteUrl,
    name,
    version,
    description,
    title,
    site_url: siteUrl,
    image_url: `https://motoviaggiatori.it/images/motoviaggiatori_icon_small.png`,
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
    // `gatsby-plugin-feed`
  ],
  mapping: {
    'MarkdownRemark.frontmatter.author': `MarkdownRemark.frontmatter.slug`,
    'MarkdownRemark.frontmatter.categories': `MarkdownRemark.frontmatter.slug`,
    'MarkdownRemark.frontmatter.tags': `MarkdownRemark.frontmatter.slug`,
  },
}
