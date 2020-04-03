import React from 'react'
import { graphql } from 'gatsby'
import moment from 'moment'

import SEO from '../components/seo'
import Layout from '../components/Layout'
import DangerousHTML from '../components/DangerousHTML'

function PageTemplate({ data }) {
  const { frontmatter, html } = data.markdownRemark;

  return (
    <Layout>
      <SEO
        title={ frontmatter.title }
        slug={ frontmatter.slug }
      />
      <DangerousHTML
        component="h1"
        html={ frontmatter.title }
        css={{ textAlign: 'center' }}
      />
      <DangerousHTML html={ html } />
      <p css={{ fontStyle: 'italic', fontSize: '.8em', textAlign: 'center' }}>
        Ultimo aggiornamento:
        &nbsp;
        {moment(frontmatter.modified || frontmatter.date).format('D MMMM YYYY')}
      </p>
    </Layout>
  )
}

export default PageTemplate

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    markdownRemark(frontmatter: {slug: {eq: $slug}}) {
      frontmatter {
        slug
        date
        modified
        title
      }
      html
    }
  }
`