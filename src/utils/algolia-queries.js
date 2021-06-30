const escapeStringRegexp = require('escape-string-regexp');
const pagePath = `content`;
const indexName = `MotoViaggiatori`;
const pageQuery = `{
  pages: allMarkdownRemark(
    filter: {
      fileAbsolutePath: { regex: "/${escapeStringRegexp(pagePath)}/" },
    }
  ) {
    edges {
      node {
        id
        frontmatter {
            path
            title
            excerpt
            modified
            tags {
                frontmatter {
                  title
                }
              }
            author {
                frontmatter {
                  title
                }
              }
            categories {
                frontmatter {
                  title
                }
              }
        }
        excerpt(pruneLength: 5000)
      }
    }
  }
}`;
function pageToAlgoliaRecord({ node: { id, frontmatter, fields, ...rest } }) {
  return {
    objectID: id,
    ...frontmatter,
    ...fields,
    ...rest,
  };
}
const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
];
module.exports = queries;
