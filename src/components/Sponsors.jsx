import React from 'react'
import { css } from '@emotion/core'
import heavyDutiesLogo from '../images/sponsors/heavy_duties.png'
import topSolutionLogo from '../images/sponsors/top_solution.png'
import cabergHelmetsLogo from '../images/sponsors/caberg_helmets.png'
import rinolfiLogo from '../images/sponsors/rinolfi.png'
import hyperproLogo from '../images/sponsors/hyperpro.png'
import putolineLogo from '../images/sponsors/putoline.png'
import anlasLogo from '../images/sponsors/anlas.png'
import xanderElectronicLogo from '../images/sponsors/xander-electronics.png'
import wrsLogo from '../images/sponsors/wrs.png'
import midlandLogo from '../images/sponsors/midland.png'

const sponsors = [{
  name: 'Top Solution',
  src: topSolutionLogo,
  href: 'https://topsolution.it/'
}, {
  name: 'Xander Electronics',
  src: xanderElectronicLogo,
  href: 'http://www.xanderelectronics.com'
}, {
  name: 'Caberg Helmets',
  src: cabergHelmetsLogo,
  href: 'https://www.caberg.it/'
}, {
  name: 'Midland',
  src: midlandLogo,
  href: 'https://www.midlandeurope.com/it'
},{
  name: 'Hyperpro',
  src: hyperproLogo,
  href: 'https://hyperpro.com'
}, {
  name: 'WRS',
  src: wrsLogo,
  href: 'https://wrs.it'
}, {
  name: 'Rinolfi motorcycle parts',
  src: rinolfiLogo,
  href: 'https://www.rinolfi.it'
}, {
  name: 'Putoline',
  src: putolineLogo,
  href: 'https://www.putoline.com/en/'
}, {
  name: 'Heavy Duties',
  src: heavyDutiesLogo,
  href: 'https://heavyduties.ro/'
}, {
  name: 'Anlas',
  src: anlasLogo,
  href: 'http://anlas.com/it/'
}];

const openSponsorLink = url => {
  if (window.ga) {
    window.ga('send', 'event', 'sponsor', 'click', url, {
      'transport': 'beacon'
    });
  }
}

const Sponsors = (props) => (
  <div
    css={css`
      display: flex;
      align-items: center;
      flex-direction: column;
      text-align: center;

      a {
        max-width: 200px;

        > img {
          margin: 10px 0;
        }
      }
    `}
    {...props}
  >
    <h4>Technical sponsors</h4>
    { sponsors.map(({href, name, src}, index) => (
        <a
          href={href}
          key={index}
          title={name}
          target="_blank"
          onClick={ () => openSponsorLink(href) }
          rel="noopener noreferrer nofollow">
          <img src={src} alt={name} />
        </a>
      ))
    }
  </div>
);

export default Sponsors;