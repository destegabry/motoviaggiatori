import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from '@emotion/styled'
import {css} from '@emotion/core'
import Isotope from 'isotope-layout'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import Card from '../components/Card'
import PostMeta from '../components/PostMeta'
import { SMALL_SCREEN_ONLY, MEDIUM_SCREEN_UP } from '../utils/breakpoints';

const Article = styled.article`
  padding: 1rem 2rem;

  h1 {
    text-align: center;
    text-transform: uppercase;
  }

  .wp-block-gallery {
    margin-left: 0;
    width: 100%;

    .blocks-gallery-item {
      display: block;
      list-style: none;
      padding: 5px;
      margin: 0;

      img {
        display: block;
        margin: 0;
      }

      figure {
        position: relative;
        overflow: hidden;
      }

      figcaption {
        font-size: .8rem;
        background: rgba(255, 255, 255, .6);
        padding: 5px;
        position: absolute;
        bottom: -10em;
        left: 0;
        right: 0;
        transition: bottom .3s;
      }

      &:hover {
        figcaption {
          bottom: 0;
        }
      }
    }
  }

  .message {
    border-radius: .4em;
    margin: 1em 0;
    padding: .5em;
    position: relative;

    .p {
      padding-bottom: .5em;
    }

    &.warning {
      background-color: #fcf8e3;
      border: 1px solid #faebcc;
      color: #8a6d3b;
    }

    &.info {
      background-color: #d9edf7;
      border: 1px solid #bce8f1;
      color: #31708f;
    }

    &.pro-tip {
      background-color: #d9edf7;
      border: 1px solid #31708f;
      color: #31708f;
      padding-top: 1.25em;

      &:before {
        content: "Pro Tip";
        background: #31708f;
        border-radius: .4em 0;
        color: white;
        fontSize: 12px;
        line-height: 20px;
        padding: 0 .75em;
        position: absolute;
        left: -1px;
        top: -1px;
        text-transform: uppercase;
      }
    }
  }
`;

const postMetaStyle = css`
  margin-bottom: 2rem;
  text-align: center;
  font-size: .9rem;
`;

const featuredMediaSyle = css`
  margin-bottom: 2rem;

  ${SMALL_SCREEN_ONLY} {
    margin-left: -1rem;
    margin-right: -1rem;
  }

  ${MEDIUM_SCREEN_UP} {
    margin-left: -2rem;
    margin-right: -2rem;
  }
`;

class PageTemplate extends Component {
  componentDidMount() {
    document.querySelectorAll('.wp-block-gallery')
      .forEach(element => {
        // const items = element.childNodes;
        // if (items.length > 1) {
        //   items.forEach(item => {
        //     item.style.width = items.length > 2 ? '33%' : '50%';
        //   });
        // }
        new Isotope(element, {
          itemSelector: '.blocks-gallery-item',
          layoutMode: 'masonry',
          masonry: {
            // columnWidth: 50
          }
        });
      });
  }

  render() {
    const currentPost = this.props.data.wordpressPost

    return (
      <Layout>
        <SEO title={currentPost.title} description={currentPost.excerpt} />
        <Card>
          <Article>
            <h1 dangerouslySetInnerHTML={{ __html: currentPost.title }} />
            <PostMeta post={currentPost} css={ postMetaStyle } />
            <Img
              fluid={ currentPost['featured_media'].localFile.childImageSharp.fluid }
              alt={ currentPost['featured_media']['alt_text'] }
              css={ featuredMediaSyle }
            />
            <div dangerouslySetInnerHTML={{ __html: currentPost.content }} />
          </Article>
        </Card>
      </Layout>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      content
      excerpt
      author {
        slug,
        name
      }
      categories {
        slug,
        name
      }
      date(formatString: "DD MMMM YYYY")
      featured_media {
        localFile {
          childImageSharp {
            fluid(
              maxWidth: 1240,
              maxHeight: 620,
              cropFocus: CENTER
            ) {
              src
              srcSet
              aspectRatio
              sizes
            }
          }
        }
      }
    }
  }
`