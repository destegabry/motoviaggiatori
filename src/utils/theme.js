import gray from 'gray-percentage'
import Color from 'color'

import { SMALL_SCREEN_ONLY } from '../utils/breakpoints'
import colors from './colors'

export const mainFontStack = ['Crimson Text', 'serif'];
export const altFontStack = ['Palanquin', 'sans-serif'];

const theme = {
  title: 'MotoViaggiatori',
  baseLineHeight: 1.4,
  headerWeight: 600,
  bodyWeight: 400,
  boldWeight: 700,
    overrideStyles: ({ rhythm }) => ({
    'h1,h2,h3,h4,h5,h6': {
      lineHeight: 1.3,
    },
    'h1,h2,h3,h4': {
      // marginTop: rhythm(1),
      marginBottom: rhythm(1 / 2),
    },
    // Lists look better when not crowded by the larger headers.
    ul: {
      marginTop: rhythm(1 / 2),
    },
    blockquote: {
      color: gray(35),
      fontStyle: 'italic',
      paddingLeft: rhythm(11 / 16),
      marginLeft: 0,
      borderLeft: `${rhythm(5 / 16)} solid ${gray(50)}`,
    },
    'blockquote > :last-child': {
      marginBottom: 0,
    },
    [SMALL_SCREEN_ONLY]: {
      blockquote: {
        borderLeft: `${rhythm(3 / 16)} solid ${gray(50)}`,
        marginLeft: rhythm(-3 / 4),
        marginRight: 0,
        paddingLeft: rhythm(9 / 16),
      },
    },
  }),
}
export { colors };
export default theme;