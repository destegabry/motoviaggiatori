import React from 'react'
import { css } from '@emotion/core'
import Color from 'color'

import {
  MEDIUM_SCREEN_UP,
  SMALL_SCREEN_ONLY
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

  ${SMALL_SCREEN_ONLY} {
    padding: 1rem;
  }

  ${MEDIUM_SCREEN_UP} {
    padding: 1rem 3rem;
  }

  h4 {
    color: inherit;
    width: 100%;
  }

  a {
    flex: 1 0 20%;
    display: block;
    padding: 1rem;
    max-width: 150px;

    ${SMALL_SCREEN_ONLY} {
      flex: 1 0 45%;
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
