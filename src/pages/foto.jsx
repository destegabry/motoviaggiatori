import React from 'react'
import styled from '@emotion/styled'
import {css} from '@emotion/core'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import InstagramFeed from '../components/InstagramFeed'
import CTA from '../components/CTA'
import {Instagram} from '../components/SocialLinks'
import Banner from '../components/banner'

const CTAWrapper = styled.p`
  padding: 2rem 0 1rem;
  text-align: center;
`;

const FotoPage = () => (
  <Layout>
    <SEO title="Foto" description="Le ultime foto dal nostro feed Instagram" slug="/foto" />
    <h3>
      Le ultime foto dal nostro feed <a
        href="https://instagram.com/motoviaggiatori"
        target="blank"
        rel="noopener noreferrer"
      >Instagram</a>
    </h3>
    <Banner sticky={true} />
    <InstagramFeed />
    <CTAWrapper>
      <CTA
        href="https://instagram.com/motoviaggiatori"
        target="blank"
        rel="noopener noreferrer"
      >
        <Instagram css={css`
          height: 1.5rem;
          height: 1.5rem;
          margin-bottom: -0.3rem!important;
          margin-right: .5rem;
        `} />
        Seguici su Instagram
      </CTA>
    </CTAWrapper>
  </Layout>
)

export default FotoPage;