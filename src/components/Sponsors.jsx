import React from 'react'
import { css } from '@emotion/core'
import heavyDutiesLogo from '../images/sponsors/heavy_duties.png'
import topSolutionLogo from '../images/sponsors/top_solution.svg'
import cabergHelmetsLogo from '../images/sponsors/caberg.svg'
import rinolfiLogo from '../images/sponsors/rinolfi.svg'
import hyperproLogo from '../images/sponsors/hyperpro.png'
import putolineLogo from '../images/sponsors/putoline.png'
import anlasLogo from '../images/sponsors/anlas.png'
import xanderElectronicLogo from '../images/sponsors/xander-electronics.svg'
import wrsLogo from '../images/sponsors/wrs.png'
import midlandLogo from '../images/sponsors/midland.svg'
import motorQualityLogo from '../images/sponsors/motorquality.svg'
import bremboLogo from '../images/sponsors/brembo.svg'

const sponsors = [{
  Logo: topSolutionLogo,
  href: 'https://topsolution.it/'
}, {
  Logo: xanderElectronicLogo,
  href: 'http://www.xanderelectronics.com'
}, {
  Logo: cabergHelmetsLogo,
  href: 'https://www.caberg.it/'
}, {
  Logo: midlandLogo,
  href: 'https://www.midlandeurope.com/it'
},{
  name: 'Hyperpro',
  src: hyperproLogo,
  href: 'https://hyperpro.com'
}, {
  Logo: bremboLogo,
  href: 'http://brembo.com/it'
}, {
  name: 'WRS',
  src: wrsLogo,
  href: 'https://wrs.it'
}, {
  name: 'Putoline',
  src: putolineLogo,
  href: 'https://www.putoline.com/en/'
}, {
  Logo: rinolfiLogo,
  href: 'https://www.rinolfi.it'
}, {
  Logo: motorQualityLogo,
  href: 'http://www.motorquality.it'
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
        max-width: 240px;

        > img,
        > svg {
          margin: 10px 0;
        }

        > svg {
          width: 100%;
        }
      }
    `}
    {...props}
  >
    <h4>Technical sponsors</h4>
    { sponsors.map(({href, name, src, Logo}, index) => (
        <a
          href={href}
          key={index}
          title={name}
          target="_blank"
          onClick={ () => openSponsorLink(href) }
          rel="noopener noreferrer nofollow">
          { Logo ? <Logo /> : <img src={src} alt={name} /> }
        </a>
      ))
    }
  </div>
);

export default Sponsors;