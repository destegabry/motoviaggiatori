import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import Card from '../components/Card'
import PagedPosts from '../components/PagedPosts'

class TagTemplate extends Component {
  render() {
    const currentTag = this.props.data.wordpressTag;
    const posts = this.props.data.allWordpressPost.edges.filter(({node}) => (
      node.tags.filter(({slug}) => slug === currentTag.slug).length > 0
    ));

    return (
      <Layout>
        <SEO title={currentTag.name} description={currentTag.description} />
        <Card>
          <div className="content">
            <h1 dangerouslySetInnerHTML={{ __html: currentTag.name }} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: currentTag.description }} />
        </Card>
        <PagedPosts posts={posts} />
      </Layout>
    )
  }
}

export default TagTemplate

export const pageQuery = graphql`
  query($id: String!) {
    wordpressTag(id: { eq: $id }) {
      name
      slug
      description
    }
    allWordpressPost {
      edges {
        node {
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
          tags {
            name
            slug
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
  }
`