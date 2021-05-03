/* eslint-disable no-console */
require('dotenv').config();
const path = require('path');

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

  const template = path.resolve('./src/pages/Post.tsx');

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
              id
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
    createPage({
      path: `${pathPrefix}/${node.childMarkdownRemark.frontmatter.path}`,
      component: template,
      context: {
        id: node.childMarkdownRemark.id,
      },
    });
  });
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  createRedirect({ fromPath: '/author', toPath: '/autori', isPermanent: true, });
  createRedirect({ fromPath: '/authors', toPath: '/autori', isPermanent: true, });

  createRedirect({ fromPath: '/foto', toPath: process.env.GATSBY_INSTAGRAM_PROFILE_URL, isPermanent: true, });


  await Promise.all([
    createBlogPages(graphql, createPage),
    createInstancePages(graphql, createPage, 'authors', 'autore', path.resolve('./src/pages/Author.tsx')),
    createInstancePages(graphql, createPage, 'tags', 'tag', path.resolve('./src/pages/Tag.tsx')),
    createInstancePages(graphql, createPage, 'categories', 'categoria', path.resolve('./src/pages/Category.tsx')),
  ]);
};
