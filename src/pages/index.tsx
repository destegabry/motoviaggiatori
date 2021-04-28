import React from 'react';
import { graphql, PageProps } from 'gatsby';

type HomeProps = PageProps<{
  allFile: {
    edges: {
      node: {
        childMarkdownRemark: {
          id: string;
          frontmatter: {
            date: string;
            path: string;
            author: string;
            category: string;
            excerpt: string;
            featured_image: string;
            title: string;
          };
        };
      };
    }[];
  };
}>;

export default function Home({ data }: HomeProps): JSX.Element {
  return (
    <>
      {data.allFile.edges.map(({ node: { childMarkdownRemark } }) => (
        <article key={childMarkdownRemark.id} itemScope itemType="http://schema.org/Article">
          <header>
            <h3>{childMarkdownRemark.frontmatter.title}</h3>
          </header>
        </article>
      ))}
    </>
  );
}

export const pageQuery = graphql`
  query HomePage {
    allFile(
      sort: { fields: [childMarkdownRemark___frontmatter___date], order: DESC }
      filter: { sourceInstanceName: { eq: "blog" } }
      limit: 10
    ) {
      edges {
        node {
          childMarkdownRemark {
            id
            frontmatter {
              date
              path
              author
              category
              excerpt
              featured_image
              title
            }
          }
        }
      }
    }
  }
`;
