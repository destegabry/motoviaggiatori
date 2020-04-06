import React from 'react'
import styled from '@emotion/styled'
import Img from 'gatsby-image/withIEPolyfill'
import YouTube from 'react-youtube-embed'

const FeaturedMediaWrapper = styled.div`
  margin: 0 -1rem 1.7rem;
`

export default ({ featured_youtube, featured_image, title, ...otherProps }) => (
  <FeaturedMediaWrapper {...otherProps}>
    { featured_youtube ? <YouTube id={ featured_youtube } /> :
      <Img
        fluid={ featured_image.childImageSharp.fluid }
        alt={ title }
      />
    }
  </FeaturedMediaWrapper>
)