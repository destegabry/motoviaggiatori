/* eslint-disable no-console */
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

  const template = path.resolve('./src/templates/Post.tsx');

  result.data.allFile.edges.forEach(({ node, next, previous }) => {
    const date = new Date(node.childMarkdownRemark.frontmatter.date);
    createPage({
      path: `${date.getFullYear()}/${date.getMonth()}/${node.childMarkdownRemark.frontmatter.path}`,
      component: template,
      context: {
        id: node.childMarkdownRemark.id,
        previousPostId: previous?.childMarkdownRemark.frontmatter.id,
        nextPostId: next?.childMarkdownRemark.frontmatter.id,
      },
    });
  });
}

async function createAuthorsPages(graphql, createPage) {
  const result = await graphql(`
    {
      allFile(filter: { sourceInstanceName: { eq: "authors" } }) {
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

  const template = path.resolve('./src/templates/Author.tsx');

  result.data.allFile.edges.forEach(({ node }) => {
    createPage({
      path: `author/${node.childMarkdownRemark.frontmatter.path}`,
      component: template,
      context: {
        id: node.childMarkdownRemark.id,
      },
    });
  });
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;

  // createRedirect({
  //   fromPath: '/author',
  //   toPath: '/authors',
  //   isPermanent: true,
  // });

  // createRedirect({
  //   fromPath: '/foto',
  //   toPath: process.env.GATSBY_INSTAGRAM_PROFILE_URL,
  //   isPermanent: true,
  // });
  await createBlogPages(graphql, createPage);
  await createAuthorsPages(graphql, createPage);
};
