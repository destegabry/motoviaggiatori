import React, { useCallback, useState } from 'react';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'gatsby';
import { useLockPageScroll } from '../../hooks/useLockPageScroll';
import { LandscapeLogo } from '../Logo';
import Container from './Container';
import { Search } from './Search/Search';
import Spacer from './Spacer';

export default function Header(): JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lockPageScroll, unlockPageScroll } = useLockPageScroll();

  const openMobileMenu = useCallback(() => {
    lockPageScroll();
    setMobileMenuOpen(true);
  }, [lockPageScroll]);

  const closeMobileMenu = useCallback(() => {
    unlockPageScroll();
    setMobileMenuOpen(false);
  }, [unlockPageScroll]);

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
          '.icon-button': {
            color: 'rgba(255, 255, 255, 0.7)',
            cursor: 'pointer',
            background: 'none',
            border: 0,
            fontSize: 'inherit',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            marginRight: theme.spacing(-1),

            '&:hover, &[aria-current]': {
              color: 'rgba(255, 255, 255, 1)',
            },
          },
          '.mobile-menu-button': {
            [theme.breakpoints.up('md')]: {
              display: 'none!important',
            },
          },
        })}
      >
        <Link to="/" title="Homepage">
          <LandscapeLogo
            css={(theme) => ({
              height: theme.components.header.height - theme.spacing(2),
              fill: theme.palette.primary.light,
            })}
            aria-label="MotoViaggiatori.it"
          />
        </Link>
        <Spacer />
        <nav
          aria-label="Menù principale"
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
          <Link to="/categoria/viaggi">Viaggi</Link>
          <Link to="/categoria/itinerari">Itinerari</Link>
          <Link to="/categoria/recensioni">Recensioni</Link>
          <a href="/foto" target="_blank" rel="noopener noreferrer">
            Foto
          </a>
          <Link to="/categoria/video">Video</Link>
          <Link to="/autori">Autori</Link>
        </nav>
        <Search />
        {mobileMenuOpen ? (
          <button onClick={closeMobileMenu} title="Chiudi menù" className="icon-button mobile-menu-button">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        ) : (
          <button onClick={openMobileMenu} title="Apri menù" className="icon-button mobile-menu-button">
            <FontAwesomeIcon icon={faBars} />
          </button>
        )}
      </Container>
    </header>
  );
}
