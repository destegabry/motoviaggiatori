import React from 'react'
import { css } from '@emotion/core'
import heavyDutiesLogo from '../images/sponsors/heavy_duties.png'
import topSolutionLogo from '../images/sponsors/top_solution.png'
import cabergHelmetsLogo from '../images/sponsors/caberg_helmets.png'
import anlasLogo from '../images/sponsors/anlas.png'

const sponsors = [{
  name: 'Top Solution',
  src: topSolutionLogo,
  href: 'https://topsolution.it/'
}, {
  name: 'Caberg Helmets',
  src: cabergHelmetsLogo,
  href: 'https://www.caberg.it/'
}, {
  name: 'Heavy Duties',
  src: heavyDutiesLogo,
  href: 'https://heavyduties.ro/'
}, {
  name: 'Anlas',
  src: anlasLogo,
  href: 'http://anlas.com/it/'
}];

const Sponsors = () => (
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
  >
    <h4>Technical sponsors</h4>
    { sponsors.map(({href, name, src}, index) => (
        <a
          href={href}
          key={index}
          title={name}
          target="_blank"
          rel="noopener noreferrer nofollow">
          <img src={src} alt={name} />
        </a>
      ))
    }
  </div>
);

export default Sponsors;