import React from 'react';
import { Link } from 'gatsby';
import { LandscapeLogo } from '../Logo';
import Container from './Container';
import Spacer from './Spacer';

export default function Header(): JSX.Element {
  return (
    <header
      css={(theme) => ({
        background: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,

        a: {
          color: 'rgba(255, 255, 255, 0.7)',
          fontWeight: theme.typography.fontWeight.medium,
          display: 'block',
          transition: 'color .3s',

          '&:hover, &[aria-current]': {
            color: 'rgba(255, 255, 255, 1)',
            textDecoration: 'none',
          },
        },
      })}
    >
      <Container
        css={(theme) => ({
          height: 60,
          display: 'flex',
          alignItems: 'stretch',
          paddingTop: theme.spacing(1),
          paddingBottom: theme.spacing(1),
        })}
      >
        <Link to="/">
          <LandscapeLogo css={(theme) => ({ height: '100%', fill: theme.palette.primary.light })} />
        </Link>
        <Spacer />
        <nav
          css={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            textTransform: 'uppercase',
            'a+a': { marginLeft: theme.spacing(2) },
          })}
        >
          <Link to="/itinerari">Itinerari</Link>
          <Link to="/viaggi">Viaggi</Link>
        </nav>
      </Container>
    </header>
  );
}
