import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'

function PageTemplate({ data }) {
  const { frontmatter, html } = data.markdownRemark;

  return (
    <Layout>
      <SEO
        title={ frontmatter.title }
        slug={ frontmatter.slug }
      />
      <DangerousHTML component="h1" html={ frontmatter.title } itemProp="name headline" />
      <DangerousHTML html={ html } itemProp="articleBody" />
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