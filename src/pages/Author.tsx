import React from 'react';
import { graphql, PageProps } from 'gatsby';

type AuthorPageProps = PageProps<{
  markdownRemark: {
    frontmatter: {
      title: string;
      links: {
        title?: string;
        url: string;
      }[];
    };
    html: string;
  };
}>;

export default function Author({ data, location }: AuthorPageProps): JSX.Element {
  const author = data.markdownRemark.frontmatter;
  return (
    <>
      <h1>{author.title}</h1>
      {author.links.map(({ title, url }, index) => (
        <div key={index}>
          <a href={url} title={title}>
            {title || url}
          </a>
        </div>
      ))}
      <section dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} itemProp="articleBody" />
      <pre>{JSON.stringify({ data, location }, null, 2)}</pre>
    </>
  );
}

export const pageQuery = graphql`
  query AuthorById($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        links {
          title
          url
        }
      }
      html
    }
  }
`;
