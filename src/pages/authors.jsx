import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import Banner from '../components/Banner'
import AuthorBox from '../components/AuthorBox'
import Columns from '../components/Columns'
import {
  MEDIUM_SCREEN_UP,
  SMALL_SCREEN_ONLY,
  VERY_SMALL_SCREEN_MAX_SIZE,
  LARGE_SCREEN_MAX_SIZE
} from '../utils/breakpoints'

const columnsWrapperCss = css`
  ${MEDIUM_SCREEN_UP} {
    margin: 0 -.5rem;
  }
`
const authorCss = css`
  ${SMALL_SCREEN_ONLY} {
    margin-bottom: .5rem;
  }

  ${MEDIUM_SCREEN_UP} {
    margin: 0 .5rem 1rem;
  }

  .content {
    flex-direction: column;
  }

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
        LARGE_SCREEN_MAX_SIZE
      ]}
      css={columnsWrapperCss}
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