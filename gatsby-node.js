const path = require('path');
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
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1000
    ) {
      edges {
        node {
          fields {
            sourceInstanceName
          }
          frontmatter {
            slug
            title
          }
        }
      }
    }
  }`);
  if (result.errors) {
    console.error(result.errors);
    throw result.errors;
  }

  const posts = result.data.allMarkdownRemark.edges.filter(edge => edge.node.fields.sourceInstanceName === 'post');
  const categories = result.data.allMarkdownRemark.edges.filter(edge => edge.node.fields.sourceInstanceName === 'category');
  const authors = result.data.allMarkdownRemark.edges.filter(edge => edge.node.fields.sourceInstanceName === 'author');
  const tags = result.data.allMarkdownRemark.edges.filter(edge => edge.node.fields.sourceInstanceName === 'tag');

  const postTemplate = path.resolve('./src/templates/Post.jsx');
  const categoryTemplate = path.resolve('./src/templates/Category.jsx');
  const authorTemplate = path.resolve('./src/templates/Author.jsx');
  const tagTemplate = path.resolve('./src/templates/Tag.jsx');

  posts.forEach(({node}, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: node.frontmatter.slug,
      component: postTemplate,
      context: {
        slug: node.frontmatter.slug,
        previous,
        next
      }
    });
  });

  categories.forEach(({node}) => {
    createPage({
      path: getCategoryUrl(node.frontmatter.slug),
      component: categoryTemplate,
      context: {
        slug: node.frontmatter.slug
      }
    });
  });

  tags.forEach(({node}) => {
    createPage({
      path: getTagUrl(node.frontmatter.slug),
      component: tagTemplate,
      context: {
        slug: node.frontmatter.slug
      }
    });
  });

  authors.forEach(({node}) => {
    createPage({
      path: getAuthorUrl(node.frontmatter.slug),
      component: authorTemplate,
      context: {
        slug: node.frontmatter.slug
      }
    });
  });
};