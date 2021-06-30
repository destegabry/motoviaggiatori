import React from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { graphql, Link, PageProps } from 'gatsby';
import { Layout } from '../components/Layout';
import Search from '../components/Layout/Search/Search';
import PostList from '../components/Post/PostList';
import { Post } from '../entities';

const searchIndices = [{ name: `MotoViaggiatori`, title: `MotoViaggiatori` }];

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
      <Search indices={searchIndices} />
      <Link
        to="/prodotti-consigliati"
        css={(theme) => ({
          fontFamily: theme.typography.fontFamily,
          fontWeight: theme.typography.fontWeight.regular,
          display: 'block',
          textAlign: 'center',
          marginTop: theme.spacing(1),
          marginBottom: theme.spacing(3),
        })}
      >
        Devi fare acquisti? Scopri i prodotti testati e approvati per la moto e il MotoViaggiatore!
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
