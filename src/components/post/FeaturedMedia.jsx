import React from 'react'
import styled from '@emotion/styled'
import Img from 'gatsby-image/withIEPolyfill'
import YouTube from 'react-youtube-embed'

import {
  SMALL_SCREEN_ONLY,
  MEDIUM_SCREEN_UP
} from '../../utils/breakpoints';

const FeaturedMediaWrapper = styled.div`
  margin-bottom: 2rem;

  ${SMALL_SCREEN_ONLY} {
    margin-left: -1rem;
    margin-right: -1rem;
  }

  ${MEDIUM_SCREEN_UP} {
    margin-left: -2rem;
    margin-right: -2rem;
  }
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