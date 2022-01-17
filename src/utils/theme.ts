import '@emotion/react';
import '@fontsource/commissioner/300.css';
import '@fontsource/commissioner/400.css';
import '@fontsource/commissioner/500.css';
import '@fontsource/commissioner/700.css';
import '@fontsource/crimson-pro/400-italic.css';
import '@fontsource/crimson-pro/400.css';
import '@fontsource/crimson-pro/500.css';
import '@fontsource/crimson-pro/700.css';
import { breakpoints } from './breakpoints';
import { accent, black, error, info, primary, secondary, success, warning, white } from './colors';
import { components } from './components';
import { transitions } from './transitions';
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
    info,
    error,
    warning,
    success,
  },
  typography,
  spacing: (space: number): number => spacingBase * space,
  components,
  breakpoints,
  transitions,
};

export type TheTheme = typeof theme;

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends TheTheme {}
}
