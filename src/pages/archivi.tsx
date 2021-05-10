import React from 'react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
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
const labelWidth = 120;

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
          '.label': {
            display: 'inline-block',
            minWidth: labelWidth,
            textAlign: 'right',
          },
          article: {
            display: 'flex',
            alignItems: 'baseline',
            marginBottom: theme.spacing(2),
          },
          time: {
            ...theme.typography.caption,
            marginRight: theme.spacing(4),
          },
          h1: {
            marginBottom: 0,
          },
          h2: {
            marginBottom: theme.spacing(1),
          },
          h3: {
            margin: 0,
          },
        })}
      >
        <h1>{title}</h1>
        {Object.keys(postsByYear)
          .sort((a, b) => +b - +a)
          .map((year) => (
            <section key={year}>
              <h2 className="label">{year}</h2>
              {postsByYear[year].map((post) => (
                <article key={post.frontmatter.path}>
                  <time dateTime={post.frontmatter.date} itemProp="datePublished" className="label">
                    {post.frontmatter.date && format(new Date(post.frontmatter.date), 'dd MMMM', { locale: it })}
                  </time>
                  <h3>
                    <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
                  </h3>
                </article>
              ))}
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
