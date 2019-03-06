import React, { Component } from 'react'
import { graphql } from 'gatsby'
import showdown from 'showdown'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import Card from '../components/Card'
import PagedPosts from '../components/PagedPosts'

const converter = new showdown.Converter();

class AuthorTemplate extends Component {
  render() {
    const currentAuthor = this.props.data.wordpressWpUsers;
    const posts = currentAuthor['authored_wordpress__POST'];

    return (
      <Layout>
        <SEO title={currentAuthor.name} description={currentAuthor.description} />
        <Card>
          <div className="content">
            <h1 dangerouslySetInnerHTML={{ __html: currentAuthor.name }} />
            <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(currentAuthor.description) }} />
          </div>
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