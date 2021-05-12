import React from 'react';
import { graphql, Link, PageProps } from 'gatsby';
import { Layout } from '../components/Layout';
import { Picture } from '../components/Picture';
import { CmsFrontmatterData } from '../entities';

type AuthorsPageProps = PageProps<{
  allFile: {
    edges: Array<{
      node: {
        childMarkdownRemark: {
          frontmatter: CmsFrontmatterData & {
            avatar: string;
          };
        };
      };
    }>;
  };
}>;

const pictureSize = {
  width: 240,
  height: 240,
};

const xsPictureSize = {
  width: 160,
  height: 160,
};

export default function AuthorsPage({ data }: AuthorsPageProps): JSX.Element {
  return (
    <Layout>
      <h1 css={{ marginTop: 0 }}>Autori</h1>
      <div
        css={(theme) => ({
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'space-around',
          margin: theme.spacing(-1 / 2),

          a: {
            display: 'block',
            flex: `0 0 ${pictureSize.width}px`,
            marginLeft: theme.spacing(1 / 2),
            marginRight: theme.spacing(1 / 2),
            marginBottom: theme.spacing(2),
            textAlign: 'center',

            [theme.breakpoints.down('md')]: {
              flexBasis: xsPictureSize.width,
            },

            h3: {
              marginTop: theme.spacing(1),
              fontSize: theme.typography.body.fontSize,

              [theme.breakpoints.only('sm')]: {
                fontSize: theme.typography.caption.fontSize,
              },
            },
          },
        })}
      >
        {data.allFile.edges.map(({ node: { childMarkdownRemark } }) => (
          <Link key={childMarkdownRemark.frontmatter.path} to={`/autore/${childMarkdownRemark.frontmatter.path}`}>
            <Picture
              src={childMarkdownRemark.frontmatter.avatar}
              alt={`Avatar ${childMarkdownRemark.frontmatter.title}`}
              {...pictureSize}
              responsive={[{ key: 'md', ...xsPictureSize }]}
            />
            <h3>{childMarkdownRemark.frontmatter.title}</h3>
          </Link>
        ))}
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query Authors {
    allFile(
      sort: { fields: [childMarkdownRemark___frontmatter___title] }
      filter: { sourceInstanceName: { eq: "authors" } }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              title
              path
              avatar
            }
          }
        }
      }
    }
  }
`;
