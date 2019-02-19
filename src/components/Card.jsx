import styled from '@emotion/styled'

import colors from '../utils/colors'
import {
  SMALL_SCREEN_ONLY,
  MEDIUM_SCREEN_UP
} from '../utils/breakpoints'

const Card = styled.div`
  background: ${colors.palette.primary.contrast};
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0,0,0,.1);

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