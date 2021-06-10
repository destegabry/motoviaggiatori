import React, { useState } from 'react';
import { faBars as MenuIcon, faTimes as CloseIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'gatsby';
import { LandscapeLogo } from '../Logo';
import Container from './Container';
import Spacer from './Spacer';

export default function Header(): JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      css={(theme) => ({
        zIndex: theme.components.header.zIndex,
        position: 'fixed',
        top: 0,
        width: '100vw',
      })}
    >
      <Container
        css={(theme) => ({
          display: 'flex',
          alignItems: 'stretch',
          height: theme.components.header.height,
          paddingTop: theme.spacing(1),
          paddingBottom: theme.spacing(1),

          a: {
            fontSize: theme.typography.caption.fontSize,
          },
        })}
      >
        <Link to="/">
          <LandscapeLogo
            css={(theme) => ({
              height: theme.components.header.height - theme.spacing(2),
              fill: theme.palette.primary.light,
            })}
            alt="MotoViaggiatori.it"
          />
        </Link>
        <Spacer />
        <nav
          className={mobileMenuOpen ? 'open' : undefined}
          css={(theme) => ({
            display: 'flex',
            textTransform: 'uppercase',

            [theme.breakpoints.up('md')]: {
              alignItems: 'center',
              'a + a': { marginLeft: theme.spacing(2) },
            },

            [theme.breakpoints.down('md')]: {
              background: theme.palette.background.negative,
              position: 'fixed',
              right: '-100vw',
              top: theme.components.header.height,
              height: `calc(100vh - ${theme.components.header.height}px)`,
              width: '100vw',
              flexDirection: 'column',
              transition: `right ${theme.transitions.duration.standard}ms`,

              '&.open': {
                right: 0,
              },

              a: {
                display: 'block',
                padding: theme.spacing(1),
                borderTop: `1px solid ${theme.palette.secondary.light}`,
              },
            },
          })}
        >
          <Link to="/categoria/itinerari">Itinerari</Link>
          <Link to="/categoria/viaggi">Viaggi</Link>
          <Link to="/categoria/recensioni">Recensioni</Link>
          <a href={process.env.GATSBY_INSTAGRAM_PROFILE_URL} target="_blank" rel="noopener noreferrer">
            Foto
          </a>
          <Link to="/categoria/video">Video</Link>
          <Link to="/autori">Autori</Link>
        </nav>
        <div
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          css={(theme) => ({
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            marginRight: theme.spacing(-1),

            [theme.breakpoints.up('md')]: {
              display: 'none',
            },
          })}
        >
          <FontAwesomeIcon icon={mobileMenuOpen ? CloseIcon : MenuIcon} />
        </div>
      </Container>
    </header>
  );
}
