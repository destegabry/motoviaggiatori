import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import Card from '../components/Card'
import PagedPosts from '../components/PagedPosts'

function TagTemplate({ data }) {
  const currentCategory = data.markdownRemark;

  return (
    <Layout>
      <SEO title={currentCategory.frontmatter.name} description={currentCategory.excerpt} />
      <Card>
        <div className="content">
          <h1>{currentCategory.frontmatter.name}</h1>
          <div dangerouslySetInnerHTML={{ __html: currentCategory.html }} />
        </div>
      </Card>
      <PagedPosts posts={data.allMarkdownRemark.edges} />
    </Layout>
  )
}

export default TagTemplate

export const pageQuery = graphql`
  query TagBySlug($slug: String!) {
    markdownRemark(frontmatter: {slug: {eq: $slug}}) {
      html
      excerpt
      frontmatter {
        name
      }
    }
    allMarkdownRemark(
      filter: {
        fields: {sourceInstanceName: {eq: "post"}},
        frontmatter: { tags: { elemMatch: { frontmatter:{slug: {eq: $slug}}}}}
      }
      sort: {
        fields: frontmatter___date
        order: DESC
      }
    ) {
      edges {
        node {
          ...PostPreviewData
        }
      }
    }
  }
`