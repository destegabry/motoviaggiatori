import css from '@emotion/css'
import Color from 'color'

import colors from '../utils/colors'
import { altFontStack } from '../utils/theme'

export default css`
  background: ${colors.palette.primary.main};
  color: ${Color(colors.palette.primary.contrast).alpha(.65).string()};
  font-family: ${altFontStack.join(', ')};

  a {
    color: inherit;

    &:hover,
    &:active {
      box-shadow: none;
      color: ${colors.palette.primary.contrast};
    }
  }

  nav a {
    box-shadow: none;

    &[aria-current] {
      color: ${colors.palette.primary.contrast};
    }
  }
`;