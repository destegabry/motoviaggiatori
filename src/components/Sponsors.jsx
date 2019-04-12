import React from 'react'
import Img from 'gatsby-image'
import { css } from '@emotion/core'

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
          max-width: 120px;
          width: 100%;

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
            onClick={ () => openSponsorLink(url) }
            rel="noopener noreferrer"
          >
            {
              !image.childImageSharp ?
              <img src={image.publicURL} alt={name} /> :
              <Img fluid={image.childImageSharp.fluid} alt={name} />
            }
          </a>
        ))
      }
    </div>
  );
}

export default Sponsors;