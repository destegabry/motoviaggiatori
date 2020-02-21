import React from 'react'
import { css } from '@emotion/core'
import Color from 'color'

import {
  SMALL_SCREEN_ONLY,
  LARGE_SCREEN_UP,
  MEDIUM_SCREEN_DOWN,
  MEDIUM_SCREEN_ONLY
} from '../utils/breakpoints';
import { palette } from '../utils/colors'

import Card from '../components/Card'
import Sponsors from '../components/Sponsors'

const cardCss = css`
  background: ${palette.primary.main};
`;

const sponsorsCss = css`
  color: ${Color(palette.primary.contrast).alpha(.65).string()};
  margin: 0 auto 1rem;

  ${MEDIUM_SCREEN_DOWN} {
    padding: 1rem;
  }

  ${LARGE_SCREEN_UP} {
    padding: 1rem 3rem;
  }

  h4 {
    color: inherit;
    width: 100%;
  }

  a {
    flex: 0 1 21%;
    display: block;
    padding: 1rem;
    max-width: 100%;

    ${SMALL_SCREEN_ONLY} {
      flex-basis: 45%;
    }

    ${MEDIUM_SCREEN_ONLY} {
      flex-basis: 25%;
    }

    ${LARGE_SCREEN_UP} {
      
    }

    &:hover {
      box-shadow: none;
    }

    img {
      margin: 0;
    }
  }
`;

const SponsorCard = (props) => (
  <Card css={cardCss} {...props}>
    <Sponsors css={sponsorsCss} />
  </Card>
)

export default SponsorCard;
