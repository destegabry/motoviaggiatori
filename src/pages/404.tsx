import React from 'react';
import { graphql, Link, PageProps } from 'gatsby';
import { Layout } from '../components/Layout';
import { Post } from '../entities';

type HomeProps = PageProps<{
  allFile: {
    edges: Array<{
      node: {
        childMarkdownRemark: Post;
      };
    }>;
  };
}>;

export default function Home({ data }: HomeProps): JSX.Element {
  return (
    <Layout>
      <h1>
        <span role="img" aria-label=":'(">
          😭
        </span>{' '}
        Ops, questa pagina non esiste…
      </h1>
      <p>
        Potresti visitare la nostra <a href="/">Home page</a>, oppure leggere uno degli ultimi articoli:
      </p>
      <ul>
        {data.allFile.edges.map(({ node: { childMarkdownRemark } }) => (
          <li
            key={childMarkdownRemark.frontmatter.path}
            itemProp="blogPost"
            itemScope
            itemType="https://schema.org/BlogPosting"
          >
            <Link to={childMarkdownRemark.frontmatter.path} itemProp="mainEntityOfPage url">
              {childMarkdownRemark.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const pageQuery = graphql`
  query NotFoundPage {
    allFile(
      sort: { fields: [childMarkdownRemark___frontmatter___date], order: DESC }
      filter: { sourceInstanceName: { eq: "blog" } }
      limit: 10
    ) {
      edges {
        node {
          childMarkdownRemark {
            ...PostPreviewData
          }
        }
      }
    }
  }
`;
