import React from 'react';
import { Link } from 'gatsby';
import { SquareLogo } from '../Logo';
import Container from './Container';
import Spacer from './Spacer';

export default function Footer(): JSX.Element {
  return (
    <footer
      css={(theme) => ({
        background: theme.palette.background.negative,
        color: theme.palette.text.negative,

        a: {
          color: 'inherit',
          display: 'block',
          textDecoration: 'none',

          '&:hover': {
            color: theme.palette.primary.light,
          },
        },
      })}
    >
      <Container
        css={(theme) => ({
          display: 'flex',
          alignItems: 'stretch',
          paddingTop: theme.spacing(1),
          paddingBottom: theme.spacing(1),
        })}
      >
        <Link to="/">
          <SquareLogo css={(theme) => ({ height: 180, fill: theme.palette.primary.light })} />
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
    </footer>
  );
}
