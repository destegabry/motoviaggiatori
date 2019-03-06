import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import showdown from 'showdown'
import styled from '@emotion/styled'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import Card from '../components/Card'
import PagedPosts from '../components/PagedPosts'
import {
  SMALL_SCREEN_ONLY,
  MEDIUM_SCREEN_UP
} from '../utils/breakpoints'

const converter = new showdown.Converter();

const FlexBox = styled.div`
  display: flex;

  ${SMALL_SCREEN_ONLY} {
    flex-direction: column;
  }
`;

const ImgWrapper = styled.div`
  ${SMALL_SCREEN_ONLY} {
    margin-bottom: 1rem;
  }

  ${MEDIUM_SCREEN_UP} {
    flex: 1 0 300px;
    margin-right: 1rem;
  }
`;


class AuthorTemplate extends Component {
  render() {
    const currentAuthor = this.props.data.wordpressWpUsers;
    const posts = currentAuthor['authored_wordpress__POST'];

    return (
      <Layout>
        <SEO title={currentAuthor.name} description={currentAuthor.description} />
        <Card>
          <FlexBox className="content">
            <ImgWrapper>
              <Img
                fluid={currentAuthor.acf.avatar.localFile.childImageSharp.fluid}
                alt={currentAuthor.acf.avatar.localFile.childImageSharp.alt_text}
              />
            </ImgWrapper>
            <div>
              <h1 dangerouslySetInnerHTML={{ __html: currentAuthor.name }} />
              <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(currentAuthor.description) }} />
              { !currentAuthor.url ? null :
                <a
                  href={currentAuthor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  { currentAuthor.url }
                </a>
              }
            </div>
          </FlexBox>
        </Card>
        <PagedPosts posts={posts} />
      </Layout>
    )
  }
}

export default AuthorTemplate

export const pageQuery = graphql`
  query($id: String!) {
    wordpressWpUsers(id: { eq: $id }) {
      name
      description
      url
      acf {
        avatar {
          source_url
          localFile {
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
          alt_text
        }
      }
      authored_wordpress__POST {
        title
          slug
          date
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
                }
              }
            }
            alt_text
          }
      }
    }
  }
`