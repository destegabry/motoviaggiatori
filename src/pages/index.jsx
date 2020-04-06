import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

import {
  LARGE_SCREEN_UP,
  MEDIUM_SCREEN_DOWN,
  MEDIUM_SCREEN_ONLY,
  MEDIUM_SCREEN_UP,
} from '../utils/breakpoints'
import getCategoryUrl from '../utils/getCategoryUrl'
import { green, pink, blue } from '../utils/colors'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import PostPreviewFull from '../components/PostPreviewFull'
import PostPreviewList from '../components/PostPreviewList'
import PagedPosts from '../components/PagedPosts'
import SponsorsCard from '../components/SponsorsCard'
import Banner from '../components/Banner'
import { IconArrowRight } from '../components/Icons'
import Link from '../components/Link'

const CategorizedPostsSection = styled.section`
  display: flex;

  ${MEDIUM_SCREEN_UP} {
    margin: 0 -0.5rem;

    > div {
      margin: 0 .5rem;
    }
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

const PostPreviewsByCategory = ({posts, categoryFilter, color}) => {
  const filteredPosts = posts.filter(({ node }) => (
    node.frontmatter.categories.filter(({ frontmatter }) => frontmatter.slug === categoryFilter).length > 0
  )).slice(0, 5);


  if (!filteredPosts || filteredPosts.length === 0) {
    return null;
  }

  return (
    <div css={css`
      border-top: 6px solid ${color};
      ${cardCss}

      h4 {
        margin: 10px;

        a {
          color: ${color}
        }

        svg {
          fill: ${color};
        }
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
      <h4 css={{color}}>
        <Link to={getCategoryUrl(categoryFilter)} icon={<IconArrowRight />}>
          { categoryFilter }
        </Link>
      </h4>
      <div className="posts-wrapper">
        <div className="main-post">
          <PostPreviewFull post={filteredPosts[0].node} />
        </div>
        <div className="older-posts">
          { filteredPosts.slice(1, 5).map(({node}, index) => <PostPreviewList key={index} post={node} />) }
        </div>
      </div>
    </div>
  )
};

const IndexPage = ({ data }) => (
  <Layout>
    <SEO slug="/" />
    <Banner sticky />
    <h4>Ultimi articoli</h4>
    <CategorizedPostsSection>
      <PostPreviewsByCategory
        posts={data.allMarkdownRemark.edges}
        categoryFilter="viaggi"
        color={blue}
      />
      <PostPreviewsByCategory
        posts={data.allMarkdownRemark.edges}
        categoryFilter="itinerari"
        color={pink}
      />
      <PostPreviewsByCategory
        posts={data.allMarkdownRemark.edges}
        categoryFilter="recensioni"
        color={green}
      />
    </CategorizedPostsSection>

    <SponsorsCard
      css={css`
        margin-left: 0!important;
        margin-right: 0!important;
      `}
    />
    <h4>Tutti gli articoli</h4>
    <PagedPosts posts={data.allMarkdownRemark.edges} />
  </Layout>
)

export default IndexPage;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: {
        fields: {sourceInstanceName:{eq:"post"}}
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