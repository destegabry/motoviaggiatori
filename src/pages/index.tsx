import React from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { graphql, Link, PageProps } from 'gatsby';
import { Layout } from '../components/Layout';
import PostList from '../components/Post/PostList';
import { Post } from '../entities';

type HomePageProps = PageProps<{
  allFile: {
    edges: Array<{
      node: {
        childMarkdownRemark: Post;
      };
    }>;
  };
}>;

export default function HomePage({ data }: HomePageProps): JSX.Element {
  return (
    <Layout>
      <Link to="/prodotti-consigliati" css={(theme) => ({ ...theme.typography.h3 })}>
        Prodotti consigliati
      </Link>
      <PostList posts={data.allFile.edges.map(({ node: { childMarkdownRemark } }) => childMarkdownRemark)} />
      <Link to="/archivi" css={(theme) => ({ display: 'inline-block', marginTop: theme.spacing(4) })}>
        <FontAwesomeIcon icon={faArrowLeft} css={(theme) => ({ marginRight: theme.spacing(1) })} />
        Post precedenti
      </Link>
    </Layout>
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
            ...PostPreviewData
          }
        }
      }
    }
  }
`;
