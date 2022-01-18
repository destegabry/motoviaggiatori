const indexName = process.env.GATSBY_ALGOLIA_SEARCH_INDEX;
const pageQuery = `{
  pages: allFile(
    filter: {
      sourceInstanceName: { eq: "blog" }
    }
  ) {
    edges {
      node {
        childMarkdownRemark {
          id
          frontmatter {
            path
            title
            excerpt
            date
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
  }
}`;
function pageToAlgoliaRecord({
  node: {
    childMarkdownRemark: { id, frontmatter, fields, ...rest },
  },
}) {
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
