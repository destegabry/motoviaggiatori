import React from 'react';
import { Link } from 'gatsby';
import { LandscapeLogo } from '../Logo';
import Container from './Container';
import Spacer from './Spacer';

export default function Header(): JSX.Element {
  return (
    <header>
      <Container
        css={(theme) => ({
          height: theme.components.header.height,
          display: 'flex',
          alignItems: 'stretch',
          paddingTop: theme.spacing(1),
          paddingBottom: theme.spacing(1),
        })}
      >
        <Link to="/">
          <LandscapeLogo
            css={(theme) => ({
              height: theme.components.header.height - theme.spacing(2),
              fill: theme.palette.primary.light,
            })}
          />
        </Link>
        <Spacer />
        <nav
          css={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            textTransform: 'uppercase',
            'a + a': { marginLeft: theme.spacing(2) },
          })}
        >
          <Link to="/categoria/itinerari">Itinerari</Link>
          <Link to="/categoria/viaggi">Viaggi</Link>
        </nav>
      </Container>
    </header>
  );
}
