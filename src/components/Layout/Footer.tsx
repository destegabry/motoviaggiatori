import React from 'react';
import { Link } from 'gatsby';
import { SquareLogo } from '../Logo';
import Container from './Container';
import Credits from './Credits';
import SocialIcons from './SocialIcons';
import Spacer from './Spacer';

export default function Footer(): JSX.Element {
  return (
    <footer>
      <Container
        css={(theme) => ({
          display: 'flex',
          alignItems: 'stretch',
          paddingTop: theme.spacing(2),
          paddingBottom: theme.spacing(2),
        })}
      >
        <div>
          <Link to="/">
            <SquareLogo
              css={(theme) => ({ height: 180, fill: theme.palette.primary.light })}
              alt="MotoViaggiatori.it"
            />
          </Link>
          <SocialIcons />
        </div>
        <Spacer />
        <nav
          css={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            textTransform: 'uppercase',
            'a + a': { marginLeft: theme.spacing(2) },
          })}
        >
          <Link to="/itinerari">Itinerari</Link>
          <Link to="/viaggi">Viaggi</Link>
        </nav>
      </Container>
      <Credits />
    </footer>
  );
}
