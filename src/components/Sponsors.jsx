import React from 'react'
import Img from 'gatsby-image/withIEPolyfill'
import { css } from '@emotion/core'

import { MEDIUM_SCREEN_ONLY } from '../utils/breakpoints';
import useAllSponsors from '../hooks/use-all-sponsors'

const openSponsorLink = url => {
  if (window.ga) {
    window.ga('send', 'event', 'sponsor', 'click', url, {
      'transport': 'beacon'
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
          max-width: 140px;
          width: 50%;
          

          ${MEDIUM_SCREEN_ONLY} {
            width: 100%;
          }

          > img,
          > svg {
            margin: 0;
          }

          > svg {
            width: 100%;
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