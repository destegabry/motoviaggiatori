import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/react'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import PagedPosts from '../components/PagedPosts'
import DangerousHTML from '../components/DangerousHTML'
import Banner from '../components/Banner'
import { MEDIUM_SCREEN_UP } from '../utils/breakpoints';

function CategoryTemplate({ data }) {
  const currentCategory = data.markdownRemark;

  return (
    <Layout>
      <SEO
        title={currentCategory.frontmatter.name}
        description={currentCategory.excerpt}
        slug={ `/categoria/${currentCategory.frontmatter.slug}` }
      />
      <h1>{currentCategory.frontmatter.name}</h1>
      <DangerousHTML html={ currentCategory.html } />
      <Banner sticky style={ css`
        margin-top: 0;
        margin-bottom: 1rem;
        ${MEDIUM_SCREEN_UP} {
          margin-left: 1rem;
          margin-right: 1rem;
        }
      ` } />
      <PagedPosts posts={data.allMarkdownRemark.edges} />
    </Layout>
  )
}

export default CategoryTemplate

export const pageQuery = graphql`
  query CategoryBySlug($slug: String!) {
    markdownRemark(frontmatter: {slug: {eq: $slug}}) {
      html
      excerpt
      frontmatter {
        name
        slug
      }
    }
    allMarkdownRemark(
      filter: {
        fields: {sourceInstanceName: {eq: "post"}},
        frontmatter: { categories: { elemMatch: { frontmatter:{slug: {eq: $slug}}}}}
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