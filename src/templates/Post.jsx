import React, { Component } from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import YouTube from 'react-youtube-embed'

import { palette } from '../utils/colors'
import {
  SMALL_SCREEN_ONLY,
  MEDIUM_SCREEN_UP,
  SMALL_SCREEN_MAX_SIZE,
  MEDIUM_SCREEN_DOWN,
  LARGE_SCREEN_UP
} from '../utils/breakpoints';
import {
  ICON_ARROW_LEFT,
  ICON_ARROW_RIGHT
} from '../utils/icons'
import Gallery from '../utils/Gallery';
import AttributesTable from '../components/AttributesTables'
import AuthorBox from '../components/AuthorBox'
import Layout from '../components/Layout'
import Flex from '../components/Flex'
import SEO from '../components/seo'
import Card from '../components/Card'
import PostMeta from '../components/PostMeta'

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
  a {
    display: inline-block;
    padding: .25rem 1rem;
    background: ${palette.grey.light};
    border-radius: 1.5rem;
    margin-bottom: .25rem;
    margin-left: .25rem;
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

const NextPrevWrapper = styled.nav`
  display: flex;
  justify-content: space-between;

  ${MEDIUM_SCREEN_UP} {
    margin: 0 1rem;
  }

  .label {
    text-transform: uppercase;
  }

  .title {
    font-size: .8em;
  }

  a:hover {
    box-shadow: none;
    text-decoration: underline;
  }

  .previous,
  .next {
    position: relative;

    ${SMALL_SCREEN_ONLY} {
      font-size: .9rem;
    }
    ${MEDIUM_SCREEN_DOWN} {
      max-width: 49%;
    }
    ${LARGE_SCREEN_UP} {
      max-width: 40%;
    }

    &::before,
    &::after {
      position: absolute;
      top: 0;
    }
  }

  .previous {
    padding-left: 1rem;

    &::before {
      left: 0;
      content: "${ICON_ARROW_LEFT}";
    }
  }

  .next {
    padding-right: 1rem;
    text-align: right;

    &::after {
      right: 0;
      content: "${ICON_ARROW_RIGHT}";
    }
  }
`;

const RelatedPost = ({label, title, slug, ...otherProps}) => (
  <Link to={slug} {...otherProps}>
    <div className="label">{ label }</div>
    <div className="title">{ title }</div>
  </Link>
)

class PageTemplate extends Component {
  componentDidMount() {
    const rowRatio = document.documentElement.clientWidth <= SMALL_SCREEN_MAX_SIZE ? 3 : 5;
    const rawFigures = document.querySelectorAll('.gatsby-resp-image-figure');
    const galleries = [];
    if (rawFigures.length > 0) {
      // good old for-loop as querySelectorAll doesn't return an iterable
      for (let i = 0, galleryWrapper; i < rawFigures.length; i++) {
        const figure = rawFigures[i];
        if (figure.previousElementSibling.className !== 'gallery-wrapper') {
          galleryWrapper = document.createElement('div');
          galleryWrapper.className = 'gallery-wrapper';
          figure.parentElement.insertBefore(galleryWrapper, figure);
          galleries.push(galleryWrapper);
        }
        galleryWrapper.appendChild(figure);
      }

      this.galleries = galleries.map(gallery => new Gallery(gallery, rowRatio));
    }
  }

  componentWillUnmount() {
    this.galleries.forEach(gallery => gallery.destroy());
  }

  render() {
    const currentPost = this.props.data.markdownRemark
    const { frontmatter } = currentPost;
    const { previous, next } = this.props.pageContext;

    return (
      <Layout itemScope itemType="http://schema.org/Article">
        <SEO title={frontmatter.title} description={frontmatter.excerpt} image={ frontmatter.featured_image.publicURL } />
        <Card css={cardCss}>
          <Article>
            <h1 dangerouslySetInnerHTML={{ __html: frontmatter.title }} itemProp="name headline" />
            <PostMeta post={currentPost} css={ postMetaStyle } />
            <div css={ featuredMediaSyle }>
              { frontmatter.featured_youtube ? <YouTube id={ frontmatter.featured_youtube } /> :
                <Img
                  fluid={ frontmatter.featured_image.childImageSharp.fluid }
                  alt={ frontmatter.title }
                />
              }
            </div>
            { !frontmatter.opening ? null : <p dangerouslySetInnerHTML={{ __html: frontmatter.opening }} /> }
            { !currentPost.tableOfContents ? null :
              <div dangerouslySetInnerHTML={{ __html: currentPost.tableOfContents }} />
            }
            { !frontmatter.attributes? null : <AttributesTable attributes={ frontmatter.attributes } /> }
            <div dangerouslySetInnerHTML={{ __html: currentPost.html }} itemProp="articleBody" />
          </Article>
        </Card>
        { !frontmatter.tags ? null :
          <Card css={cardCss}>
            <TagSection>
              <h3>Tags</h3>
              { frontmatter.tags.map(({frontmatter}) => (
                <Link key={frontmatter.slug} to={`/${frontmatter.slug}`}>
                  {frontmatter.name}
                </Link>
              )) }
            </TagSection>
          </Card>
        }
        <Card css={cardCss} itemProp="author" itemScope="itemscope" itemType="http://schema.org/Person">
          <AuthorBox author={frontmatter.author} showProfileLink={true} />
        </Card>
        <NextPrevWrapper>
          { !previous ? null :
            <RelatedPost
              label="Post precedente"
              className="previous"
              {...previous.frontmatter}
            />
          }
          <Flex />
          { !next ? null :
            <RelatedPost
              label="Prossimo post"
              className="next"
              {...next.frontmatter}
            />
          }
        </NextPrevWrapper>
      </Layout>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      tableOfContents(
        pathToSlugField: "frontmatter.slug"
        maxDepth: 2
      )
      frontmatter {
        title
        date
        excerpt
        opening
        attributes {
          key
          value
        }
        categories {
          frontmatter {
            slug
            name
          }
        }
        tags {
          frontmatter {
            slug
            name
          }
        }
        author {
          html
          frontmatter {
            name
            slug
            avatar {
              publicURL
              childImageSharp {
                fluid(
                  maxWidth: 300,
                  maxHeight: 300,
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
        featured_youtube
        featured_image {
          publicURL
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