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
          background: theme.palette.background.negative,
          margin: 0,
          padding: 0,
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.fontSize,
          fontWeight: theme.typography.fontWeight.regular,
          lineHeight: theme.typography.lineHeight,
        },

        body: {
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

        picture: {
          height: 0,
          overflow: 'hidden',
          position: 'relative',
          display: 'block',

          '> img': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          },
        },
      })}
    />
  );
}
