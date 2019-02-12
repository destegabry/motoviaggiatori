import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import Card from '../components/Card'
import PostMeta from '../components/PostMeta'
import TagLink from '../components/TagLink'
import {
  SMALL_SCREEN_ONLY,
  MEDIUM_SCREEN_UP,
  SMALL_SCREEN_MAX_SIZE
} from '../utils/breakpoints';
import Gallery from '../utils/gallery';

const galleryPadding = 5;

const cardCss = css`
  ${SMALL_SCREEN_ONLY} {
    padding: 1rem;
  }

  ${MEDIUM_SCREEN_UP} {
    padding: 1rem 2rem;
  }
`;

const Article = styled.article`
  h1 {
    text-align: center;
    text-transform: uppercase;
  }

  figure {
    img {
      width: 100%;
      height: auto;
    }
  }

  .wp-block-gallery,
  .wp-block-jetpack-tiled-gallery {
    display: block;
    width: 100%;

    > * {
      display: none;
    }
  }

  .gallery-wrapper {
    margin: 1.5rem 0 3rem;
    position: relative;
    overflow: hidden;
    width: 100%;

    .gallery-row {
      margin-bottom: ${galleryPadding}px;
    }

    figure {
      cursor: pointer;
      margin: 0;
      position: absolute;
      overflow: hidden;

      &:hover {
        figcaption {
          bottom: 0;
        }
      }
    }

    img {
      margin: 0;
      width: 100%;
      display: block;
    }

    figcaption {
      font-size: .8rem;
      background: rgba(255, 255, 255, .6);
      padding: ${galleryPadding}px;
      position: absolute;
      bottom: -10em;
      left: 0;
      right: 0;
      transition: bottom .3s;
    }
  }

  .gallery-lightbox {
    background: rgba(0, 0, 0, .95);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 2rem;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1000;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
     -khtml-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;

    figure {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: stretch;
      position: relative;
      pointer-events: none;
    }

    figcaption {
      color: white;
      font-size: .85rem;
    }
  }

  .gallery-lightbox-controls {
    .control {
      color: white;
      cursor: pointer;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.5rem;
      height: 2rem;
      width: 2rem;
    }

    .control-next {
      right: 0;
      top: 50%;
      margin-top: -1rem
    }

    .control-prev {
      left: 0;
      top: 50%;
      margin-top: -1rem
    }

    .control-close {
      top: 0;
      right: 0;
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

const TagSection = styled.section`
  a:not(:last-child)::after {
    content: ', ';
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
    const rowRatio = document.documentElement.clientWidth <= SMALL_SCREEN_MAX_SIZE ? 3 : 4;
    this.galleries = [];
    document.querySelectorAll('.wp-block-gallery')
      .forEach(wpGallery => {
        this.galleries.push(new Gallery(wpGallery, rowRatio, galleryPadding));
      });
  }

  componentWillUnmount() {
    this.galleries.forEach(gallery => gallery.destroy());
  }

  render() {
    const currentPost = this.props.data.wordpressPost

    return (
      <Layout itemScope itemType="http://schema.org/Article">
        <SEO title={currentPost.title} description={currentPost.excerpt} image={ currentPost.featured_media.source_url } />
        <Card css={cardCss}>
          <Article>
            <h1 dangerouslySetInnerHTML={{ __html: currentPost.title }} itemProp="name headline" />
            <PostMeta post={currentPost} css={ postMetaStyle } />
            { currentPost.categories.find(category => category.slug === 'video') ? null :
              <Img
                fluid={ currentPost.featured_media.localFile.childImageSharp.fluid }
                alt={ currentPost.featured_media.alt_text }
                css={ featuredMediaSyle }
              />
            }
            <div dangerouslySetInnerHTML={{ __html: currentPost.content }} itemProp="articleBody" />
          </Article>
        </Card>
        <Card css={cardCss}>
          <TagSection>
            <h3>Tags</h3>
            { currentPost.tags.map(tag => <TagLink key={tag.slug} tag={tag} />) }
          </TagSection>
        </Card>
        <Card css={cardCss} itemProp="author" itemScope="itemscope" itemType="http://schema.org/Person">
          <h3>Autore</h3>
          <h4 itemProp="name" dangerouslySetInnerHTML={{ __html: currentPost.author.name }} />
          <div itemProp="description" dangerouslySetInnerHTML={{ __html: currentPost.author.description }} />
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
        name,
        description
      }
      categories {
        id
        name
        slug
        parent_element {
          id
        }
      }
      tags {
        name
        slug
      }
      date
      modified
      featured_media {
        source_url
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