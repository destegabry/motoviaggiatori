const escapeStringRegexp = require('escape-string-regexp');
const pagePath = `content`;
const indexName = process.env.GATSBY_ALGOLIA_SEARCH_INDEX;
const pageQuery = `{
  pages: allMarkdownRemark(
    filter: {
      filter: { sourceInstanceName: { eq: "blog" } }
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
            created
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
