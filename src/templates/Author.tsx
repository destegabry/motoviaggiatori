import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { Layout } from '../components/Layout';
import { Picture } from '../components/Picture';
import PostList from '../components/Post/PostList';
import { Post } from '../entities';

type AuthorPageProps = PageProps<{
  markdownRemark: {
    frontmatter: {
      title: string;
      avatar: string;
      links?: {
        title?: string;
        url: string;
      }[];
    };
    html: string;
  };
  allFile: {
    edges: Array<{
      node: {
        childMarkdownRemark: Post;
      };
    }>;
  };
}>;

export default function AuthorPage({ data }: AuthorPageProps): JSX.Element {
  const author = data.markdownRemark.frontmatter;
  return (
    <Layout>
      <div
        itemScope
        itemType="http://schema.org/Person"
        css={(theme) => ({
          display: 'flex',
          flexDirection: 'row',
          picture: {
            display: 'inline-block',
            flexShrink: 0,
            marginRight: theme.spacing(2),
            marginTop: theme.spacing(1),
          },
          h1: {
            marginTop: 0,
          },
        })}
      >
        <Picture src={author.avatar} alt={`Avatar ${author.title}`} width={240} height={240} />
        <div>
          <h1 itemProp="name">{author.title}</h1>
          {author.links?.map(({ title, url }, index) => (
            <div key={index}>
              <a itemProp="sameAs" href={url} title={title} target="_blank" rel="noopener noreferrer">
                {title || url}
              </a>
            </div>
          ))}
          <section dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} itemProp="description" />
        </div>
      </div>
      <h4>I post di {author.title}</h4>
      <PostList posts={data.allFile.edges.map(({ node }) => node.childMarkdownRemark)} />
    </Layout>
  );
}

export const pageQuery = graphql`
  query AuthorByPath($id: String!) {
    markdownRemark(frontmatter: { path: { eq: $id } }) {
      frontmatter {
        title
        avatar
        links {
          title
          url
        }
      }
      html
    }
    allFile(
      sort: { fields: childMarkdownRemark___frontmatter___date, order: DESC }
      filter: {
        childMarkdownRemark: { frontmatter: { author: { frontmatter: { path: { eq: $id } } } } }
        sourceInstanceName: { eq: "blog" }
      }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              date
              path
              author {
                frontmatter {
                  path
                  title
                }
              }
              categories {
                frontmatter {
                  path
                  title
                }
              }
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
