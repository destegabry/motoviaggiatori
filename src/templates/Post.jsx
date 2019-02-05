import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { debounce } from 'debounce'

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

const galleryPadding = 5;
const Article = styled.article`
  ${SMALL_SCREEN_ONLY} {
    padding: 1rem;
  }

  ${MEDIUM_SCREEN_UP} {
    padding: 1rem 2rem;
  }

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

const calculateGalleryItemXoffset = (item, rowHeight) => {
  if (!item || !item.prevRowItem) {
    return 0;
  }
  return item.prevRowItem.ratio * rowHeight + galleryPadding + calculateGalleryItemXoffset(item.prevRowItem, rowHeight);
}


class PageTemplate extends Component {
  drawGallery(galleryRows, prevGallery) {
    const galleryWrapper = document.createElement('div');
    galleryWrapper.className = 'gallery-wrapper';
    galleryRows.forEach(row => {
      row.height = (prevGallery.getBoundingClientRect().width - galleryPadding * (row.items.length - 1)) / row.ratio;
      const galleryRow = document.createElement('div');
      galleryRow.className = 'gallery-row';
      galleryRow.style.height = `${row.height}px`;
      row.items.forEach(item => {
        item.element.style.height = `${row.height}px`;
        item.element.style.width = `${row.height * item.ratio}px`;
        item.element.style.transform = `translate(${calculateGalleryItemXoffset(item, row.height)}px, 0)`;
        galleryRow.appendChild(item.element);
      });
      galleryWrapper.appendChild(galleryRow);
    })
    prevGallery.parentElement.replaceChild(galleryWrapper, prevGallery);
    return galleryWrapper;
  };

  parseWPGallery(wpGallery, rowRatio) {
    const items = wpGallery.querySelectorAll('figure');
    const galleryRows = [];
    let prevRowItem;
    items.forEach(element => {
      const { width, height } = element.childNodes[0];
      const ratio = width / height;
      if (galleryRows.length === 0 || Math.round(galleryRows[galleryRows.length - 1].ratio + ratio) > rowRatio) {
        galleryRows.push({ items: [], ratio: 0 });
        prevRowItem = null;
      }
      const row = galleryRows[galleryRows.length - 1];
      const item = {element, width, height, ratio, prevRowItem}
      row.items.push(item);
      prevRowItem = item;
      row.ratio += ratio;
      element.parentElement.remove();
    });
    return galleryRows;
  }

  redrawGalleries() {
    this.galleries = this.galleries.map(({rows, container}) => ({
      rows,
      container: this.drawGallery(rows, container)
    }));
  }

  componentDidMount() {
    window.onresize = debounce(() => this.redrawGalleries(), 200);
    const rowRatio = document.documentElement.clientWidth <= SMALL_SCREEN_MAX_SIZE ? 3 : 4;
    this.galleries = [];
    document.querySelectorAll('.wp-block-gallery, .wp-block-jetpack-tiled-gallery')
      .forEach(wpGallery => {
        const rows = this.parseWPGallery(wpGallery, rowRatio);
        this.galleries.push({
          rows,
          container: this.drawGallery(rows, wpGallery)
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
            { currentPost.categories.find(category => category.slug === 'video') ? null :
              <Img
                fluid={ currentPost['featured_media'].localFile.childImageSharp.fluid }
                alt={ currentPost['featured_media']['alt_text'] }
                css={ featuredMediaSyle }
              />
            }
            <div dangerouslySetInnerHTML={{ __html: currentPost.content }} />
            <TagSection>
              <h3>Tags</h3>
              { currentPost.tags.map(tag => <TagLink key={tag.slug} tag={tag} />) }
            </TagSection>
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