import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import Card from '../components/Card'
import PagedPosts from '../components/PagedPosts'

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
          </div>
          <div dangerouslySetInnerHTML={{ __html: currentAuthor.description }} />
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