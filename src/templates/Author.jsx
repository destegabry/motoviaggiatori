import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import PagedPosts from '../components/PagedPosts'
import AuthorBox from '../components/AuthorBox';
import Banner from '../components/Banner'
import { MEDIUM_SCREEN_UP } from '../utils/breakpoints'

function AuthorTemplate({ data }) {
  const currentAuthor = data.markdownRemark;

  return (
    <Layout>
      <SEO
        title={ currentAuthor.frontmatter.name }
        description={ currentAuthor.excerpt }
        image={ currentAuthor.frontmatter.avatar ? currentAuthor.frontmatter.avatar.publicURL : null }
        slug={ `/author/${currentAuthor.frontmatter.slug}` }
      />
      <AuthorBox author={ currentAuthor } />
      <Banner sticky style={ css`
        margin-top: 0;
        margin-bottom: 1rem;
        ${MEDIUM_SCREEN_UP} {
          margin-left: 1rem;
          margin-right: 1rem;
        }
      ` } />
      <PagedPosts posts={ data.allMarkdownRemark.edges } />
    </Layout>
  )
}

export default AuthorTemplate

export const pageQuery = graphql`
  query AuthorBySlug($slug: String!) {
    markdownRemark(frontmatter: {slug: {eq: $slug}}) {
      ...AuthorData
      frontmatter {
        website
        facebook {
          name
          url
        }
        instagram {
          name
          url
        }
        youtube {
          name
          url
        }
      }
    }
    allMarkdownRemark(
      filter: {
        fields: {sourceInstanceName: {eq: "post"}},
        frontmatter: { author: { frontmatter:{slug: {eq: $slug}}}}
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