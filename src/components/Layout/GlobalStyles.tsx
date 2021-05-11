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

          [theme.breakpoints.down('sm')]: {
            fontSize: (theme.typography.fontSize / 4) * 3,
          },
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

        'header, footer, aside': {
          background: theme.palette.background.negative,
          color: theme.palette.text.negative,

          a: {
            color: 'rgba(255, 255, 255, 0.7)',
            fontWeight: theme.typography.fontWeight.medium,
            display: 'inline-block',
            transition: 'color .3s',
            textDecoration: 'none',

            '&:hover, &[aria-current]': {
              color: 'rgba(255, 255, 255, 1)',
            },
          },
        },

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
          color: 'currentcolor',
          textDecorationColor: theme.palette.primary.light,
          textDecorationLine: 'underline',

          '&:visited': {
            textDecorationColor: theme.palette.primary.main,
          },

          '&:hover': {
            color: theme.palette.primary.dark,
          },

          '&:active': {
            color: theme.palette.accent.dark,
            textDecorationColor: theme.palette.accent.main,
          },
        },

        svg: {
          fill: 'currentcolor',
        },

        picture: {
          display: 'block',

          '> img': {
            maxWidth: '100%',
            height: 'auto',
          },
        },
      })}
    />
  );
}
