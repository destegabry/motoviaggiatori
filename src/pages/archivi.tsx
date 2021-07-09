import React from 'react';
import { format } from 'date-fns';
import locale from 'date-fns/locale/it';
import { graphql, Link, PageProps } from 'gatsby';
import { Layout } from '../components/Layout';
import { Post } from '../entities';

type ArchivesPageProps = PageProps<{
  allFile: {
    edges: Array<{
      node: {
        childMarkdownRemark: Post;
      };
    }>;
  };
}>;

const title = 'Archivi';

export default function ArchivesPage({ data }: ArchivesPageProps): JSX.Element {
  const postsByYear = data.allFile.edges.reduce((byYear, { node }) => {
    const post = node.childMarkdownRemark;
    const year = new Date(post.frontmatter.date || Date.now()).getFullYear();
    byYear[year] = byYear[year] || [];
    byYear[year].push(post);
    return byYear;
  }, {} as Record<string, Post[]>);

  return (
    <Layout title={title}>
      <div
        css={(theme) => ({
          position: 'relative',

          article: {
            marginBottom: theme.spacing(2),
          },
          time: {
            ...theme.typography.caption,
            marginRight: theme.spacing(4),
          },

          h3: {
            margin: 0,
            lineHeight: 1.6,
          },

          [theme.breakpoints.down('sm')]: {
            h2: {
              display: 'none',
            },
          },

          [theme.breakpoints.up('sm')]: {
            '.year': {
              display: 'none',
            },
            '.label': {
              display: 'inline-block',
              textAlign: 'right',
              minWidth: 120,
            },
            section: {
              marginTop: theme.spacing(4),
              display: 'flex',
              alignItems: 'baseline',
            },
            article: {
              display: 'flex',
              alignItems: 'baseline',
            },
            h1: {
              margin: 0,
            },
            h2: {
              margin: 0,
              position: 'sticky',
              top: theme.components.header.height,
            },
          },
        })}
      >
        <h1>{title}</h1>
        {Object.keys(postsByYear)
          .sort((a, b) => +b - +a)
          .map((year) => (
            <section key={year}>
              <h2 className="label">{year}</h2>
              <div>
                {postsByYear[year].map((post) => (
                  <article key={post.frontmatter.path}>
                    <time dateTime={post.frontmatter.date} itemProp="datePublished" className="label">
                      {post.frontmatter.date && format(new Date(post.frontmatter.date), 'dd MMMM', { locale })}
                      <span className="year">
                        {post.frontmatter.date && format(new Date(post.frontmatter.date), ' yyyy', { locale })}
                      </span>
                    </time>
                    <h3>
                      <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
                    </h3>
                  </article>
                ))}
              </div>
            </section>
          ))}
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query Archives {
    allFile(
      sort: { fields: [childMarkdownRemark___frontmatter___date], order: DESC }
      filter: { sourceInstanceName: { eq: "blog" } }
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
