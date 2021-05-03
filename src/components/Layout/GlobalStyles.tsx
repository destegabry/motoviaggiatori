import React from 'react';
import { Global } from '@emotion/react';

export default function GlobalStyles(): JSX.Element {
  return (
    <Global
      styles={(theme) => ({
        '*, *::after, *::before': {
          boxSizing: 'border-box',
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased',
          fontSmoothing: 'antialiased',
        },

        html: {
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.fontSize,
          lineHeight: theme.typography.lineHeight,
          fontWeight: theme.typography.fontWeight.regular,
        },

        'html, body': {
          backgroundColor: theme.palette.common.white,
          color: theme.palette.common.black,
          margin: 0,
          padding: 0,
        },

        h1: theme.typography.h1,
        h2: theme.typography.h2,
        h3: theme.typography.h3,
        h4: theme.typography.h4,
        h5: theme.typography.h5,
        h6: theme.typography.h6,
        p: theme.typography.body,

        main: {
          ol: {
            ...theme.typography.body,
          },
          ul: {
            ...theme.typography.body,
            listStyle: 'circle',
          },
          li: {
            marginBlock: '.5em',
          },

          blockquote: {
            fontStyle: 'italic',
            position: 'relative',
            display: 'inline-block',
            margin: 0,
            paddingTop: 1,
            paddingBottom: 1,
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4),

            '&:before, &:after': {
              fontSize: '2em',
              position: 'absolute',
              lineHeight: 1,
            },

            '&:before': {
              content: '"“"',
              left: 0,
              top: 0,
            },

            '&:after': {
              content: '"„"',
              right: 0,
              bottom: theme.spacing(1),
            },
          },
        },

        a: {
          color: theme.palette.primary.dark,
          textDecoration: 'none',

          '&:visited': {
            color: theme.palette.secondary.light,
            textDecoration: 'underline',
          },

          '&:hover, &:active': {
            color: theme.palette.accent.dark,
            textDecoration: 'underline',
          },
        },

        svg: {
          fill: 'currentcolor',
        },
      })}
    />
  );
}
