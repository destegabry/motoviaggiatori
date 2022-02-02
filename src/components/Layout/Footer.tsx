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

          [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            alignItems: 'center',
          },
        })}
      >
        <div>
          <Link to="/" title="Homepage">
            <SquareLogo css={(theme) => ({ height: 180, fill: theme.palette.primary.light })} />
          </Link>
          <SocialIcons />
        </div>
        <Spacer />
        <nav
          aria-label="Menù footer"
          css={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            textTransform: 'uppercase',

            [theme.breakpoints.down('md')]: {
              flexDirection: 'column',
              marginTop: theme.spacing(2),
            },

            [theme.breakpoints.up('md')]: {
              'a + a': {
                marginLeft: theme.spacing(2),
              },
            },
          })}
        >
          <Link to="/categoria/viaggi">Viaggi</Link>
          <Link to="/categoria/itinerari">Itinerari</Link>
          <Link to="/categoria/recensioni">Recensioni</Link>
          <Link to="/categoria/video">Video</Link>
          <Link to="/archivi">Archivi</Link>
          <Link to="/autori">Autori</Link>
        </nav>
      </Container>
      <Credits />
    </footer>
  );
}
