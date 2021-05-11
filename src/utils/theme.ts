import '@emotion/react';
import '@fontsource/eb-garamond/400-italic.css';
import '@fontsource/eb-garamond/400.css';
import '@fontsource/eb-garamond/700.css';
import '@fontsource/palanquin/300.css';
import '@fontsource/palanquin/400.css';
import '@fontsource/palanquin/500.css';
import '@fontsource/palanquin/700.css';
import { breakpoints } from './breakpoints';
import { accent, black, error, primary, secondary, success, warning, white } from './colors';
import { typography } from './typography';

const spacingBase = 8;

export const theme = {
  palette: {
    common: { white, black },
    background: { default: white, negative: secondary.main },
    text: {
      primary: black,
      negative: secondary.contrastText,
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
  typography,
  spacing: (space: number): number => spacingBase * space,
  components: {
    container: {
      maxWidth: breakpoints.values.md,
    },
    header: {
      height: 60,
      zIndex: 1000,
    },
  },
  breakpoints,
};

export type TheTheme = typeof theme;

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends TheTheme {}
}
