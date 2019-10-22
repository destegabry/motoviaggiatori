import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import Card from '../components/Card'
import Banner from '../components/banner'

import {useAllPosts} from '../hooks/use-all-posts'

const NotFoundPage = () => {
  const posts = useAllPosts();
  return (
    <Layout>
      <SEO title="404: Not found" />
      <Banner sticky={true} style={{ margin: '.5rem 1rem 1rem' }} />
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