import '@emotion/react';
import '@fontsource/eb-garamond/400-italic.css';
import '@fontsource/eb-garamond/400.css';
import '@fontsource/eb-garamond/700.css';
import '@fontsource/palanquin/300.css';
import '@fontsource/palanquin/400.css';
import '@fontsource/palanquin/500.css';
import '@fontsource/palanquin/700.css';
import { accent, black, error, primary, secondary, success, warning, white } from './colors';

const spacingBase = 8;

const fontFamilySerif = ['EB Garamond', 'serif'].join(', ');
const fontFamilySansSerif = ['Palanquin', 'sans-serif'].join(', ');

const fontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
};

export const theme = {
  palette: {
    common: { white, black },
    background: { default: white },
    text: {
      primary: black,
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.37)',
    },
    primary,
    secondary,
    accent,
    error,
    warning,
    success,
  },
  typography: {
    fontSize: 24,
    lineHeight: 1.5,
    fontFamily: fontFamilySansSerif,
    fontWeight,
    h1: {
      fontSize: '2.25rem',
      fontWeight: fontWeight.light,
      lineHeight: 1.15,
      marginBlockStart: '.6em',
      marginBlockEnd: '.6em',
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: fontWeight.light,
      lineHeight: 1.2,
      marginBlockStart: '.75em',
      marginBlockEnd: '.75em',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: fontWeight.regular,
      lineHeight: 1.2,
      marginBlockStart: '.8em',
      marginBlockEnd: '.8em',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: fontWeight.regular,
      lineHeight: 1.25,
      marginBlockStart: '.8em',
      marginBlockEnd: '.8em',
    },
    h5: {
      fontSize: '1.1rem',
      fontWeight: fontWeight.medium,
      lineHeight: 1.4,
      marginBlockStart: '1em',
      marginBlockEnd: '1em',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: fontWeight.medium,
      lineHeight: 1.5,
      marginBlockStart: '1em',
      marginBlockEnd: '1em',
    },
    body: {
      fontFamily: fontFamilySerif,
      fontWeight: fontWeight.regular,
      lineHeight: 1.5,
      fontSize: '1rem',
      marginBlockStart: '1em',
      marginBlockEnd: '1em',
    },
  },
  container: {
    maxWidth: '900px',
  },
  spacing: (space: number): number => spacingBase * space,
  components: {
    header: {
      height: 60,
    },
  },
};

export type TheTheme = typeof theme;

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends TheTheme {}
}
