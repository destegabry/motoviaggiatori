require('dotenv').config();
const  he = require('he');
const  stripHtml = require('string-strip-html');

const name = 'MotoViaggiatori';
const title = name;
const description = 'Due ruote, infinite emozioni';
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
    site_url: siteUrl
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
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
        icon: `src/images/motoviaggiatori_icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
    // In your gatsby-config.js

    /*
    * Gatsby's data processing layer begins with “source”
    * plugins. Here the site sources its data from Wordpress.
    */

    {
      resolve: `gatsby-source-instagram-all`,
      options: {
        access_token: process.env.INSTAGRAM_ACCESS_TOKEN
      }
    },
    {
      resolve: "gatsby-source-wordpress",
      options: {
        baseUrl: "edit.motoviaggiatori.it",
        protocol: "https",
        hostingWPCOM: false,
        useACF: true,
        acfOptionPageIds: [],
        auth: {
        },
        verboseOutput: false,
        perPage: 100,
        concurrentRequests: 10,
        includedRoutes: [
          "/*/*/categories",
          "/*/*/posts",
          "/*/*/pages",
          "/*/*/media",
          "/*/*/tags",
          "/*/*/taxonomies",
          "/*/*/users",
        ],
        auth: {
          htaccess_user: process.env.HTACCESS_USER,
          htaccess_pass: process.env.HTACCESS_PASS,
        }
      },
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
        feeds: [
          {
            serialize: ({ query: { allWordpressPost } }) => {
              return allWordpressPost.edges.map(({ node }) => {
                return {
                  title: node.title,
                  description: he.decode(stripHtml(node.excerpt)),
                  date: node.date,
                  url: siteUrl + node.slug,
                  guid: siteUrl + node.slug,
                }
              })
            },
            query: `
              {
                allWordpressPost {
                  edges {
                    node {
                      title
                      slug
                      date
                      excerpt
                      featured_media {
                        source_url
                      }
                    }
                  }
                }
              }
            `,
            output: `/rss.xml`,
            title: `Feed RSS MotoViaggiatori`,
          },
        ],
      }
    }
  ],
}
