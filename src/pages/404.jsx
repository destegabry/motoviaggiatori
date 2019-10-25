import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import Card from '../components/Card'
import Banner from '../components/Banner'
import { MEDIUM_SCREEN_UP } from '../utils/breakpoints'

import {useAllPosts} from '../hooks/use-all-posts'

const NotFoundPage = () => {
  const posts = useAllPosts();
  return (
    <Layout>
      <SEO title="404: Not found" />
      <Banner sticky style={ css`
        margin-top: .5rem;
        margin-bottom: 1rem;
        ${MEDIUM_SCREEN_UP} {
          margin-left: 1rem;
          margin-right: 1rem;
        }
      ` } />
      <Card>
        <div className="content">
          <h1>Questa pagina non esiste <span role="img" aria-label=":'(">😭</span></h1>
          <p>
            Potresti visitare la nostra <a href="/">Home page</a>,
            oppure leggere uno degli ultimi articoli:
          </p>
          <ul>
            {posts.slice(0, 10).map(({node}, index) => (
              <li key={index}>
                <Link to={node.frontmatter.slug}>
                  {node.frontmatter.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </Layout>
  )
}

export default NotFoundPage