import React from 'react';
import { Global } from '@emotion/react';
import emotionReset from 'emotion-reset';

import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

export default function GlobalStyles(): JSX.Element {
  return (
    <Global
      styles={(theme) => ({
        emotionReset,

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
            transition: `color ${theme.transitions.duration.standard}ms`,
            textDecoration: 'none',

            '&:hover, &[aria-current]': {
              color: 'rgba(255, 255, 255, 1)',
            },
          },
        },

        main: {
          paddingTop: theme.spacing(2) + theme.components.header.height,
          paddingBottom: theme.spacing(2),

          a: {
            fontWeight: 500,
          },

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
          textDecoration: 'underline',

          '&:hover': {
            background: theme.palette.primary.light,
            textDecoration: 'none',
          },

          '&:visited': {
            textDecorationColor: theme.palette.primary.dark,
          },

          '&:active': {
            background: theme.palette.accent.main,
            textDecoration: 'none',
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
          },

          tbody: {
            'th, td': {
              verticalAlign: 'top',
            },
          },
        },

        '.md-gallery': {
          display: 'flex',
          marginTop: '2em',
          position: 'relative',
          left: 'calc(-50vw + 50%)',
          width: '100vw',
          overflow: 'hidden',

          '.md-gallery__loader': {
            position: 'absolute',
            left: '50%',
            top: '50%',
            fontSize: '2em',
            margin: '-1em 0 0 -1em',
            color: theme.palette.secondary.light,

            '> svg': {
              animation: `${theme.transitions.keyframes.spin} ${theme.transitions.duration.spin}ms linear infinite`,
            },
          },

          '.md-gallery__slider': {
            display: 'flex',
            alignItems: 'flex-start',
            visibility: 'hidden',
          },

          '.md-gallery__slider_animated': {
            transition: `transform ${theme.transitions.duration.standard}ms`,
          },

          '.md-gallery__nav': {
            position: 'absolute',
            top: '50%',
            fontSize: '2em',
            marginTop: '-1em',
            color: theme.palette.primary.light,
            userSelect: 'none',
            cursor: 'pointer',
            transition: `opacity ${theme.transitions.duration.standard}ms`,
          },

          '.md-gallery__nav_disabled': {
            opacity: 0.3,
            cursor: 'default',
          },

          '.md-gallery__nav_prev': {
            left: theme.spacing(2),
          },

          '.md-gallery__nav_next': {
            right: theme.spacing(2),
          },

          picture: {
            position: 'relative',
            display: 'block',

            img: {
              maxWidth: '100vw',
            },

            '& + picture': {
              marginLeft: theme.spacing(1),
            },
          },

          figcaption: {
            ...theme.typography.caption,
            position: 'absolute',
            padding: theme.spacing(1),
            left: 0,
            right: 0,
          },

          [theme.breakpoints.down('sm')]: {
            height: `calc(${theme.components.gallery.smHeight}px + 5em)`,

            img: {
              maxHeight: theme.components.gallery.smHeight,
            },
          },
          [theme.breakpoints.up('sm')]: {
            height: `calc(${theme.components.gallery.height}px + 4em)`,

            img: {
              maxHeight: theme.components.gallery.height,
            },
          },
        },
      })}
    />
  );
}
