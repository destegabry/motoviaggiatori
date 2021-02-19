import { css } from '@emotion/react'
import Color from 'color'

import { palette } from '../utils/colors'
import { altFontStack } from '../utils/theme'

export default css`
  background: ${palette.primary.main};
  color: ${Color(palette.primary.contrast).alpha(.65).string()};
  font-family: ${altFontStack.map(name => `"${name}"`).join(', ')};

  a {
    color: inherit;
    transition: color .3s;

    &:hover,
    &:active {
      box-shadow: none;
      color: ${palette.primary.contrast};
    }


    > svg {
      display: block;
    }
  }

  nav a {
    box-shadow: none;

    &[aria-current] {
      color: ${palette.primary.contrast};
    }
  }
`;