import styled from '@emotion/styled'
import Color from 'color'
import { palette } from '../utils/colors'
import { altFontStack } from '../utils/theme'

export default styled.a`
  background: ${palette.primary.main};
  color: ${Color(palette.primary.contrast).alpha(.65).string()};
  display: inline-block;
  font-family: ${altFontStack.join(', ')};
  text-transform: uppercase;
  padding: .5rem 1rem;
  transition: color .3s;

  svg {
    fill: ${Color(palette.primary.contrast).alpha(.65).string()};
    transition: fill .3s;
  }

  &:hover {
    color: ${palette.primary.contrast};
    box-shadow: none;

    svg {
      fill: ${palette.primary.contrast};
    }
  }
`