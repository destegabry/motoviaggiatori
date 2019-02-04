const name = 'MotoViaggiatori';
const colors = require('./src/utils/colors');

module.exports = {
  siteMetadata: {
    siteUrl: `https://motoviaggiatori.it`,
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
      resolve: "gatsby-source-wordpress",
      options: {
        baseUrl: "motoviaggiatori.it",
        protocol: "https",
        hostingWPCOM: false,
        useACF: false,
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
        ]
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-51082295-6",
        respectDNT: true
      },
    },
    `gatsby-plugin-sitemap`,
  ],
}
