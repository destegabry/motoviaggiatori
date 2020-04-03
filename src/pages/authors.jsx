import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import Banner from '../components/Banner'
import AuthorBox from '../components/AuthorBox'
import Columns from '../components/Columns'
import {
  VERY_SMALL_SCREEN_MAX_SIZE,
} from '../utils/breakpoints'

const authorCss = css`
  flex-direction: column;
  margin-bottom: 1rem;

  .image-wrapper {
    flex: 1 0 0%;
    margin: 0 0 1rem;
  }

  p {
    font-size: .8em;
    margin-bottom: 0;
  }

  h1 {
    font-size: 1.5em
  }
`

const AuthorsPage = ({ data }) => (
  <Layout>
    <SEO title="Autori" description="I nostri MotoViaggiatori" slug="/author" />
    <h3>
      I nostri MotoViaggiatori
    </h3>
    <Banner sticky={true} />
    <Columns
      items={
        data.allMarkdownRemark.edges.map(({node}, index) => (
          <AuthorBox
            author={node}
            showProfileLink={true}
            css={authorCss}
            key={index}
          />
        ))
      }
      breakpoints={[
        VERY_SMALL_SCREEN_MAX_SIZE,
        800,
        1080
      ]}
    />
  </Layout>
)

export default AuthorsPage

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: {
        fields: {
          sourceInstanceName: { eq: "author" }
        }
      }
      sort: {
        fields: frontmatter___name
        order: ASC
      }
    ) {
      edges {
        node {
          html
          frontmatter {
            name
            slug
            ...AuthorAvatar
          }
        }
      }
    }
  }
`