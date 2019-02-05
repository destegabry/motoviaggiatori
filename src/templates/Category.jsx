import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import Card from '../components/Card'
import PagedPosts from '../components/PagedPosts'

class CategoryTemplate extends Component {
  render() {
    const currentCategory = this.props.data.wordpressCategory;
    const posts = this.props.data.allWordpressPost.edges.filter(({node}) => (
      node.categories.filter(({slug}) => slug === currentCategory.slug).length > 0
    ));

    return (
      <Layout>
        <SEO title={currentCategory.name} description={currentCategory.description} />
        <Card>
          <div className="content">
            <h1 dangerouslySetInnerHTML={{ __html: currentCategory.name }} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: currentCategory.description }} />
        </Card>
        <PagedPosts posts={posts} />
      </Layout>
    )
  }
}

export default CategoryTemplate

export const pageQuery = graphql`
  query($id: String!) {
    wordpressCategory(id: { eq: $id }) {
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