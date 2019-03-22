import React, { Component } from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import getTagUrl from '../utils/getTagUrl'
import { palette } from '../utils/colors'
import {
  SMALL_SCREEN_ONLY,
  MEDIUM_SCREEN_UP
} from '../utils/breakpoints';
import AttributesTable from '../components/AttributesTables'
import AuthorBox from '../components/AuthorBox'
import Layout from '../components/Layout'
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

class PageTemplate extends Component {
  // componentDidMount() {
  //   const rowRatio = document.documentElement.clientWidth <= SMALL_SCREEN_MAX_SIZE ? 3 : 4;
  //   this.galleries = [];
  //   document.querySelectorAll('.wp-block-gallery')
  //     .forEach(wpGallery => {
  //       this.galleries.push(new Gallery(wpGallery, rowRatio));
  //     });
  // }

  // componentWillUnmount() {
  //   this.galleries.forEach(gallery => gallery.destroy());
  // }

  render() {
    const currentPost = this.props.data.markdownRemark
    const { frontmatter } = currentPost;
    const { previousPost, nextPost } = this.props.pageContext
    return (
      <Layout itemScope itemType="http://schema.org/Article">
        <SEO title={frontmatter.title} description={frontmatter.excerpt} image={ frontmatter.featured_image.publicURL } />
        <Card css={cardCss}>
          <Article>
            <h1 dangerouslySetInnerHTML={{ __html: frontmatter.title }} itemProp="name headline" />
            <PostMeta post={currentPost} css={ postMetaStyle } />
            { frontmatter.categories.find(category => category.frontmatter.slug === 'video') ? null :
              <Img
                fluid={ frontmatter.featured_image.childImageSharp.fluid }
                alt={ frontmatter.title }
                css={ featuredMediaSyle }
              />
            }
            { !frontmatter.opening ? null : <p>{ frontmatter.opening }</p> }
            <AttributesTable attributes={ frontmatter.attributes } />
            <div dangerouslySetInnerHTML={{ __html: this.props.data.markdownRemark.html }} itemProp="articleBody" />
          </Article>
        </Card>
        <Card css={cardCss}>
          <TagSection>
            <h3>Tags</h3>
            { frontmatter.tags.map(({frontmatter}) => (
              <Link key={frontmatter.slug} to={getTagUrl(frontmatter.slug)}>
                {frontmatter.name}
              </Link>
            )) }
          </TagSection>
        </Card>
        <Card css={cardCss} itemProp="author" itemScope="itemscope" itemType="http://schema.org/Person">
          <AuthorBox author={frontmatter.author} showProfileLink={true} />
        </Card>
      </Layout>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
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