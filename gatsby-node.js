/* eslint-disable no-console */
require('dotenv').config();
const path = require('path');
const remark = require('remark');
const remarkHTML = require('remark-html');

exports.onCreateNode = ({ node, actions: { createNodeField } }) => {
  if (node.frontmatter?.opening) {
    const value = remark().use(remarkHTML).processSync(node.frontmatter.opening).toString();

    createNodeField({
      name: `opening_html`,
      node,
      value,
    });
  }

  if (node.frontmatter?.disclaimer) {
    const value = remark().use(remarkHTML).processSync(node.frontmatter.disclaimer).toString();

    createNodeField({
      name: `disclaimer_html`,
      node,
      value,
    });
  }
};

async function createBlogPages(graphql, createPage) {
  const result = await graphql(`
    {
      allFile(
        sort: { fields: [childMarkdownRemark___frontmatter___date], order: DESC }
        filter: { sourceInstanceName: { eq: "blog" } }
      ) {
        edges {
          node {
            childMarkdownRemark {
              id
              frontmatter {
                date
                path
              }
            }
          }
          next {
            childMarkdownRemark {
              id
            }
          }
          previous {
            childMarkdownRemark {
              id
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    console.error(result.errors);
    throw result.errors;
  }

  const template = path.resolve('./src/templates/Post.tsx');

  result.data.allFile.edges.forEach(({ node, next, previous }) => {
    createPage({
      path: `${node.childMarkdownRemark.frontmatter.path}`,
      component: template,
      context: {
        id: node.childMarkdownRemark.id,
        previousPostId: previous?.childMarkdownRemark.id,
        nextPostId: next?.childMarkdownRemark.id,
      },
    });
  });
}

async function createInstancePages(graphql, createPage, instanceName, pathPrefix, template) {
  const result = await graphql(`
    {
      allFile(filter: { sourceInstanceName: { eq: "${instanceName}" } }) {
        edges {
          node {
            childMarkdownRemark {
              frontmatter {
                path
              }
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    console.error(result.errors);
    throw result.errors;
  }

  result.data.allFile.edges.forEach(({ node }) => {
    const path = pathPrefix
      ? `${pathPrefix}/${node.childMarkdownRemark.frontmatter.path}`
      : node.childMarkdownRemark.frontmatter.path;
    createPage({
      path: path,
      component: template,
      context: {
        id: node.childMarkdownRemark.frontmatter.path,
      },
    });
  });
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;
  // Redirect authors
  createRedirect({ fromPath: '/author', toPath: '/autori', isPermanent: true });
  createRedirect({ fromPath: '/authors', toPath: '/autori', isPermanent: true });
  const authorsResult = await graphql(`
    {
      allFile(filter: { sourceInstanceName: { eq: "authors" } }) {
        edges {
          node {
            childMarkdownRemark {
              frontmatter {
                path
              }
            }
          }
        }
      }
    }
  `);
  if (authorsResult.errors) {
    console.error(authorsResult.errors);
    throw authorsResult.errors;
  }
  authorsResult.data.allFile.edges.forEach(({ node }) => {
    const path = node.childMarkdownRemark.frontmatter.path;
    createRedirect({ fromPath: `/author/${path}`, toPath: `/autore/${path}`, isPermanent: true });
    createRedirect({ fromPath: `/authors/${path}`, toPath: `/autore/${path}`, isPermanent: true });
    createRedirect({ fromPath: `/autori/${path}`, toPath: `/autore/${path}`, isPermanent: true });
  });
  // Redirect to Instagram
  createRedirect({ fromPath: '/foto', toPath: process.env.GATSBY_INSTAGRAM_PROFILE_URL, isPermanent: true });
  // Create pages
  await Promise.all([
    createBlogPages(graphql, createPage),
    createInstancePages(graphql, createPage, 'pages', null, path.resolve('./src/templates/Page.tsx')),
    createInstancePages(graphql, createPage, 'authors', 'autore', path.resolve('./src/templates/Author.tsx')),
    createInstancePages(graphql, createPage, 'tags', 'tag', path.resolve('./src/templates/Tag.tsx')),
    createInstancePages(graphql, createPage, 'categories', 'categoria', path.resolve('./src/templates/Category.tsx')),
  ]);
};
