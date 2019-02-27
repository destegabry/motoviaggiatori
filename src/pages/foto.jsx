import React from 'react'
import Layout from '../components/Layout'
import Card from '../components/Card'
import SEO from '../components/seo'
import InstagramFeed from '../components/InstagramFeed'

const FotoPage = ({ data }) => (
  <Layout>
    <SEO title="Foto" description="Le ultime foto dal nostro feed Instagram" />
    <Card>
      <div className="content">
        <h1>Foto</h1>
        <p>
          Le ultime foto dal nostro feed <a
            href="https://instagram.com/motoviaggiatori"
            target="blank"
            rel="noopener noreferrer"
          >Instagram</a>
        </p>
        <InstagramFeed />
      </div>
    </Card>
  </Layout>
)

export default FotoPage;