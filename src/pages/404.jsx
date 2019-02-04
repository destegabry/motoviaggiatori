import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import Card from '../components/Card'
import PostLink from '../components/PostLink'

const NotFoundPage = () => (
  <StaticQuery
    query={graphql`
      query notFoundQuery {
        allWordpressPost {
          edges {
            node {
              id
              title
              slug
              date
            }
          }
        }
      }
    `}
    render={({allWordpressPost}) => (
      <Layout>
        <SEO title="404: Not found" />
        <Card>
          <div className="content">
            <h1>Questa pagina non esiste <span role="img" aria-label=":'(">😭</span></h1>
            <p>
              Potresti visitare la nostra <a href="/">Home page</a>,
              oppure leggere uno degli ultimi articoli:
            </p>
            <ul>
              {allWordpressPost.edges.slice(0, 10).map(({node}) => (
                <li key={node.id}>
                  <PostLink post={node} />
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </Layout>
    )}
  />
)

export default NotFoundPage
