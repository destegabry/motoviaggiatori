import React from 'react'
import Img from 'gatsby-image/withIEPolyfill'
import { css } from '@emotion/react'

import useAllSponsors from '../hooks/use-all-sponsors'
import {
  SMALL_SCREEN_ONLY,
  MEDIUM_SCREEN_UP,
} from '../utils/breakpoints'

const openSponsorLink = url => {
  if (window.gtag) {
    window.gtag('event', 'click', {
      event_category: 'sponsor',
      event_label: url,
    });
  }
}

const Sponsors = (props) => {
  const sponsors = useAllSponsors().map(({node}) => node.frontmatter);

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        flex-flow: row wrap;
        justify-content: space-around;
        text-align: center;

        a {
          padding: .5rem;

          ${MEDIUM_SCREEN_UP} {
            width: 25%;
          }

          ${SMALL_SCREEN_ONLY} {
            width: 50%;
          }

          > .gatsby-image-wrapper,
          > img {
            max-width: 5rem;
            margin: 0 auto;
          }
        }
      `}
      {...props}
    >
      <h4>Technical sponsors</h4>
      { sponsors.map(({url, name, image}, index) => (
          <a
            href={url}
            key={index}
            title={name}
            target="_blank"
            rel="noopener noreferrer"
            onClick={ () => openSponsorLink(url) }
          >
            {
              !image.childImageSharp ?
              <img src={image.publicURL} alt={name} loading="lazy" /> :
              <Img fluid={image.childImageSharp.fluid} alt={name} loading="lazy" />
            }
          </a>
        ))
      }
    </div>
  );
}

export default Sponsors;