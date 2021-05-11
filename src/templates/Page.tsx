import React from 'react';
import { format } from 'date-fns';
import locale from 'date-fns/locale/it';
import { graphql, PageProps } from 'gatsby';
import { Layout } from '../components/Layout';
import { CmsFrontmatterData } from '../entities';

type CmsPageProps = PageProps & {
  data: {
    markdownRemark: {
      html: string;
      frontmatter: CmsFrontmatterData & {
        date?: string;
        excerpt?: string;
      };
    };
  };
};

export default function CmsPage({ data }: CmsPageProps): JSX.Element {
  const page = data.markdownRemark.frontmatter;

  return (
    <Layout title={page.title} description={page.excerpt}>
      <div itemProp="article" itemScope itemType="https://schema.org/Article">
        <h1 itemProp="name headline">{page.title}</h1>
        <section dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} itemProp="articleBody" />
        {page.date && (
          <p
            css={(theme) => ({ fontStyle: 'italic', fontSize: theme.typography.caption.fontSize, textAlign: 'center' })}
          >
            Ultimo aggiornamento: &nbsp;
            {format(new Date(page.date), 'dd MMMM yyyy', { locale })}
          </p>
        )}
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query CmsPageByPath($id: String!) {
    markdownRemark(frontmatter: { path: { eq: $id } }) {
      html
      frontmatter {
        path
        excerpt
        title
        date
      }
    }
  }
`;
