import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

import {
  LARGE_SCREEN_UP,
  MEDIUM_SCREEN_DOWN,
  MEDIUM_SCREEN_ONLY,
  MEDIUM_SCREEN_UP,
} from '../utils/breakpoints';

import Layout from '../components/Layout'
import Card from '../components/Card'
import SEO from '../components/seo'
import PostPreviewFull from '../components/PostPreviewFull'
import PostPreviewList from '../components/PostPreviewList'
import PagedPosts from '../components/PagedPosts'
import SponsorsCard from '../components/SponsorsCard'

const CategorizedPostsSection = styled.section`
  display: flex;

  ${MEDIUM_SCREEN_UP} {
    margin: 0 -1rem;
  }

  ${MEDIUM_SCREEN_DOWN} {
    flex-direction: column
  }
`;

const cardCss = css`
  ${LARGE_SCREEN_UP} {
    flex: 1 0 0%
  }

  h4 {
    margin: 0;
  }

  article {
    border-top: 1px solid rgba(0,0,0,.1);
  }

  .posts-wrapper {
    padding: 0;

    ${MEDIUM_SCREEN_ONLY} {
      display: flex;
      flex-direction: column;
      flex-direction: row;

      > * {
        width: 50%;
      }

      .main-post {
        border-right: 1px solid rgba(0,0,0,.1);
      }
    }
  }
`;

const PostPreviewsByCategory = ({allWordpressPost, categoryFilter, color}) => {
  const filteredPosts = allWordpressPost.edges.filter(({node}) => (
    node.categories.filter(({slug}) => slug === categoryFilter).length > 0
  )).slice(0, 5);
  const category = filteredPosts[0].node.categories.find(({slug}) => slug === categoryFilter);
  return (
    <Card css={css`
      border-top: 6px solid ${color};
      ${cardCss}

      h4 {
        margin: 10px;
      }

      .main-post {
        h3 {
          color: ${color};
        }
      }

      a:hover {
        h3 {
          color: ${color};
        }
      }
    `}>
      <h4 dangerouslySetInnerHTML={{ __html: category.name }} css={{color}} />
      <div className="posts-wrapper">
        <div className="main-post">
          <PostPreviewFull post={filteredPosts[0].node} />
        </div>
        <div className="older-posts">
          { filteredPosts.slice(1, 5).map(({node}) => <PostPreviewList key={node.slug} post={node} />) }
        </div>
      </div>
    </Card>
  )
};

const IndexPage = ({ data }) => (
  <Layout>
    <SEO />
    <h4>Ultimi articoli</h4>
    <CategorizedPostsSection>
      <PostPreviewsByCategory
        allWordpressPost={data.allWordpressPost}
        categoryFilter="viaggi"
        color="#00a8ff"
      />
      <PostPreviewsByCategory
        allWordpressPost={data.allWordpressPost}
        categoryFilter="itinerari"
        color="#db509f"
      />
      <PostPreviewsByCategory
        allWordpressPost={data.allWordpressPost}
        categoryFilter="recensioni"
        color="#689c1f"
      />
    </CategorizedPostsSection>

    <SponsorsCard
      css={css`
        margin-left: 0!important;
        margin-right: 0!important;
      `}
    />
    <h4>Tutti gli articoli</h4>
    <PagedPosts
      posts={data.allWordpressPost.edges}
      css={css`
        ${MEDIUM_SCREEN_UP} {
          margin: 0 -1rem;
        }
      `} />
  </Layout>
)

export default IndexPage;

export const pageQuery = graphql`
  {
    allWordpressPost {
      edges {
        node {
          title
          slug
          date
          modified
          author {
            name
            slug
          }
          excerpt
          categories {
            id
            name
            slug
            parent_element {
              id
            }
          }
          featured_media {
            source_url
            localFile {
              childImageSharp {
                wide: fluid(
                  maxWidth: 600,
                  maxHeight: 350,
                  cropFocus: CENTER
                ) {
                  src
                  srcSet
                  aspectRatio
                  sizes
                },
                square: fluid(
                  maxWidth: 80,
                  maxHeight: 80,
                  cropFocus: CENTER
                ) {
                  src
                  srcSet
                  aspectRatio
                  sizes
                }
              }
            }
            alt_text
          }
        }
      }
    }
  }
`