import React from 'react';
import { Global, keyframes } from '@emotion/react';

const swipeLeft = keyframes`
	0% {
		transform: translatex(0);
	}
	25% {
		transform: translatex(-10vw);
	}
	100% {
		transform: translatex(0);
	}
`;

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
          paddingTop: theme.spacing(2) + theme.components.header.height,
          paddingBottom: theme.spacing(2),

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

        table: {
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: theme.typography.body.marginBlockStart,
          marginBottom: theme.typography.body.marginBlockEnd,

          'th, td': {
            borderBottom: `1px solid ${theme.palette.text.disabled}`,
            textAlign: 'left',
            padding: theme.spacing(1),
            // paddingBottom: theme.spacing(1),
            // paddingTop: theme.spacing(1),
            // paddingBottom: theme.spacing(1),
          },

          tbody: {
            'th, td': {
              verticalAlign: 'top',
            },
          },
        },

        '.md-gallery': {
          position: 'relative',
          left: '50%',
          width: '100vw',
          marginLeft: '-50vw',
          marginTop: '3em',
          overflow: 'auto hidden',

          '.swipe-wrapper': {
            position: 'absolute',
            bottom: '5em',
            right: '1em',
            color: theme.palette.accent.light,
            animation: `${swipeLeft} 1.5s ease infinite`,
            opacity: 0.95,
            transition: `opacity 1s`,

            svg: {
              height: '2.5rem',
              width: '2.5rem',
            },
          },

          '.md-gallery-scroller': {
            display: 'flex',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            height: '100%',
            minWidth: '100vw',
            padding: `0 ${theme.spacing(1 / 2)}px`,
          },

          figure: {
            position: 'relative',
            margin: `0 ${theme.spacing(1 / 2)}px`,
            width: 'auto',
            height: '100%',
          },

          figcaption: {
            ...theme.typography.caption,
            padding: '.5em',
            position: 'absolute',
            left: 0,
            width: '100%',
          },

          [theme.breakpoints.down('sm')]: {
            height: `calc(${theme.components.gallery.smHeight}px + 4em)`,

            img: {
              height: theme.components.gallery.smHeight,
            },

            figcaption: {
              top: theme.components.gallery.smHeight,
            },
          },
          [theme.breakpoints.up('sm')]: {
            height: `calc(${theme.components.gallery.height}px + 4em)`,

            img: {
              height: theme.components.gallery.height,
            },

            figcaption: {
              top: theme.components.gallery.height,
            },
          },
        },
      })}
    />
  );
}
