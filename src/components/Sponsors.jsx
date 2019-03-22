import React from 'react'
import { css } from '@emotion/core'
import heavyDutiesLogo from '../../content/images/sponsors/heavy_duties.png'
import topSolutionLogo from '../../content/images/sponsors/top_solution.svg'
import cabergHelmetsLogo from '../../content/images/sponsors/caberg.svg'
import rinolfiLogo from '../../content/images/sponsors/rinolfi.svg'
import hyperproLogo from '../../content/images/sponsors/hyperpro.png'
import putolineLogo from '../../content/images/sponsors/putoline.png'
import anlasLogo from '../../content/images/sponsors/anlas.svg'
import xanderElectronicLogo from '../../content/images/sponsors/xander-electronics.svg'
import wrsLogo from '../../content/images/sponsors/wrs.png'
import midlandLogo from '../../content/images/sponsors/midland.svg'
import motorQualityLogo from '../../content/images/sponsors/motorquality.svg'
import bremboLogo from '../../content/images/sponsors/brembo.svg'
import belinassuLogo from '../../content/images/sponsors/belinassu.png'

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
  name: 'Belinassu SMART IAT',
  src: belinassuLogo,
  href: 'https://heavyduties.ro/'
}, {
  name: 'Heavy Duties',
  src: heavyDutiesLogo,
  href: 'https://heavyduties.ro/'
}, {
  Logo: anlasLogo,
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
        max-width: 120px;

        > img,
        > svg {
          margin: 5px 0;
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