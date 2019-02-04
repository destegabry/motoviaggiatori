const slash = require('slash');
const path = require('path');
const getPostUrl = require('./src/utils/getPostUrl');
const getPageUrl = require('./src/utils/getPageUrl');
const getCategoryUrl = require('./src/utils/getCategoryUrl');
const getTagUrl = require('./src/utils/getTagUrl');
const getAuthorUrl = require('./src/utils/getAuthorUrl');
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.createPages = async ({graphql, actions}) => {
  const { createPage } = actions
  const result = await graphql(`{
    allWordpressPage {
      edges {
        node {
          id
          slug
          template
          title
        }
      }
    }
    allWordpressPost {
      edges {
        node {
          id
          slug
          status
          template
          title
          date
        }
      }
    }
    allWordpressCategory {
      edges {
        node {
          id
          name
          slug
          parent_element {
            id
          }
        }
      }
    }
    allWordpressTag {
      edges {
        node {
          id
          name
          description
          slug
        }
      }
    }
    allWordpressWpUsers {
      edges {
        node {
          id
          name
          description
          slug
        }
      }
    }
    wordpressSiteMetadata {
      name
      description
      url
      home
    }
  }`);
  if (result.errors) {
    console.error(result.errors);
    throw result.errors;
  }
  const pageTemplate = path.resolve('./src/templates/Page.jsx');
  const postTemplate = path.resolve('./src/templates/Post.jsx');
  const categoryTemplate = path.resolve('./src/templates/Category.jsx');
  const tagTemplate = path.resolve('./src/templates/Tag.jsx');
  const authorTemplate = path.resolve('./src/templates/Author.jsx');

  // result.data.allWordpressPage.edges.forEach(({node}) => {
  //   createPage({
  //     path: getPageUrl(node),
  //     component: slash(pageTemplate),
  //     context: {
  //       id: node.id,
  //       title: node.title,
  //       type: 'page'
  //     },
  //   });
  // });

  result.data.allWordpressPost.edges.forEach(({node}) => {
    createPage({
      path: getPostUrl(node),
      component: slash(postTemplate),
      context: {
        id: node.id,
        title: node.title,
        type: 'post'
      },
    });
  });

  result.data.allWordpressCategory.edges.forEach(({node}) => {
    createPage({
      path: getCategoryUrl(node, result.data.allWordpressCategory.edges),
      component: slash(categoryTemplate),
      context: {
        id: node.id,
        title: node.name,
        type: 'category'
      },
    });
  });

  result.data.allWordpressTag.edges.forEach(({node}) => {
    createPage({
      path: getTagUrl(node),
      component: slash(tagTemplate),
      context: {
        id: node.id,
        title: node.name,
        type: 'tag'
      },
    });
  });

  result.data.allWordpressWpUsers.edges.forEach(({node}) => {
    createPage({
      path: getAuthorUrl(node),
      component: slash(authorTemplate),
      context: {
        id: node.id,
        title: node.name,
        type: 'author'
      },
    });
  });
};