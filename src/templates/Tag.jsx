import React, { Component } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import Card from '../components/Card'
import PagedPosts from '../components/PagedPosts'

class TagTemplate extends Component {
  render() {
    const currentCategory = this.props.data.markdownRemark;

    return (
      <Layout>
        <SEO title={currentCategory.frontmatter.name} description={currentCategory.excerpt} />
        <Card>
          <div className="content">
            <h1>{currentCategory.frontmatter.name}</h1>
            <div dangerouslySetInnerHTML={{ __html: currentCategory.html }} />
          </div>
        </Card>
        <PagedPosts posts={this.props.data.allMarkdownRemark.edges} />
      </Layout>
    )
  }
}

export default TagTemplate

export const pageQuery = graphql`
  query TagBySlug($slug: String!) {
    markdownRemark(frontmatter: {slug: {eq: $slug}}) {
      html
      excerpt
      frontmatter {
        name
      }
    }
    allMarkdownRemark(filter: {
      fields: {sourceInstanceName: {eq: "post"}},
      frontmatter: { tags: { elemMatch: { frontmatter:{slug: {eq: $slug}}}}}
    }) {
      edges {
        node {
          frontmatter {
            slug
            title
            excerpt
            date
            featured_image {
              publicURL
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
            author {
              frontmatter {
                slug
                name
              }
            }
            categories {
              frontmatter {
                slug
                name
              }
            }
          }
        }
      }
    }
  }
`