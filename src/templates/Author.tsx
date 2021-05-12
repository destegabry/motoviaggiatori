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
    excerpt: string;
  };
  allFile: {
    edges: Array<{
      node: {
        childMarkdownRemark: Post;
      };
    }>;
  };
}>;

const pictureSize = {
  width: 240,
  height: 240,
};

export default function AuthorPage({ data }: AuthorPageProps): JSX.Element {
  const author = data.markdownRemark.frontmatter;
  return (
    <Layout title={author.title} description={data.markdownRemark.excerpt} image={author.avatar}>
      <div
        itemScope
        itemType="http://schema.org/Person"
        css={(theme) => ({
          display: 'flex',

          [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            textAlign: 'center',

            p: {
              textAlign: 'left',
            },
          },
        })}
      >
        <div
          css={(theme) => ({
            ...pictureSize,

            [theme.breakpoints.up('sm')]: {
              flex: `0 0 ${pictureSize.width}px`,
              marginRight: theme.spacing(2),
              marginTop: theme.spacing(1),
            },

            [theme.breakpoints.down('sm')]: {
              margin: `0 auto ${theme.spacing(2)}px`,
            },
          })}
        >
          <Picture src={author.avatar} alt={`Avatar ${author.title}`} {...pictureSize} />
        </div>
        <div>
          <h1 itemProp="name" css={{ marginTop: 0 }}>
            {author.title}
          </h1>
          {author.links?.map(({ title, url }, index) => (
            <div key={index} css={(theme) => ({ fontSize: theme.typography.caption.fontSize })}>
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
      excerpt
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
            ...PostPreviewData
          }
        }
      }
    }
  }
`;
