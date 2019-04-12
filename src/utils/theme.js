import gray from 'gray-percentage'
import Color from 'color'
import WebFont from 'webfontloader'

import { SMALL_SCREEN_ONLY } from '../utils/breakpoints'
import colors from './colors'

export const mainFontStack = ['Merriweather', 'serif'];
export const altFontStack = ['Open Sans', 'sans-serif'];

WebFont.load({
  google: {
    families: ['Open Sans:400,600', 'Merriweather:400,400i,700,700i']
  }
});

const theme = {
  title: 'MotoViaggiatori',
  baseFontSize: '16px',
  baseLineHeight: 1.7,
  headerFontFamily: altFontStack,
  bodyFontFamily: mainFontStack,
  headerColor: Color(colors.text.primary).alpha(0.9).string(),
  bodyColor: colors.text.primary,
  headerWeight: 600,
  bodyWeight: 400,
  boldWeight: 700,
  overrideStyles: ({ rhythm }) => ({
    // Lighten larger headers so they don't contrast so much with the body.
    h1: {
      color: Color(colors.text.primary).alpha(0.8).string(),
    },
    h2: {
      color: Color(colors.text.primary).alpha(0.825).string(),
    },
    h3: {
      color: Color(colors.text.primary).alpha(0.85).string(),
    },
    'h1,h2,h3,h4,h5,h6': {
      lineHeight: 1.3,
    },
    'h1,h2,h3,h4': {
      // marginTop: rhythm(1),
      marginBottom: rhythm(1 / 2),
    },
    'h4,h5,h6': {
      textTransform: 'uppercase',
    },
    // Lists look better when not crowded by the larger headers.
    ul: {
      marginTop: rhythm(1 / 2),
    },
    a: {
      color: colors.palette.secondary.dark,
      textDecoration: 'none',
    },
    'a:hover,a:active': {
      // color: colors.palette.secondary.dark,
      boxShadow: '0 1px 0 0 currentColor',
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
      html: {
        fontSize: '90%',
      },
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