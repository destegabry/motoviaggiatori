import styled from '@emotion/styled'

import {
  SMALL_SCREEN_ONLY,
  MEDIUM_SCREEN_UP
} from '../utils/breakpoints'

const Card = styled.div`

  ${MEDIUM_SCREEN_UP} {
    margin: 0 1rem 1.5rem;
  }

  ${SMALL_SCREEN_ONLY} {
    margin: 0 .2rem 1.5rem;
  }

  > .content {
    padding: 10px;
  }
`;

export default Card;