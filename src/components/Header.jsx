import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { InView } from 'react-intersection-observer'
import Color from 'color'

import Logo from '../images/motoviaggiatori_logo.svg'
import Wrapper from './Wrapper'
import MainMenu from './MainMenu'
import headerFooterStyle from '../utils/headerFooterStyle'
import {
  SMALL_SCREEN_ONLY,
  MEDIUM_SCREEN_UP
} from '../utils/breakpoints'
import { palette } from '../utils/colors';

const headerHeightDesktopNormal = 100;
const headerHeightDesktopCollapsed = 60;

const headerHeightMobile = 60;

const HeaderElement = styled.header`
  .logo {
    text-decoration: none;
    display: block;

    svg {
      transition: height .3s ease-out;

      ${SMALL_SCREEN_ONLY} {
        height: ${headerHeightMobile - 20}px;
      }

      ${MEDIUM_SCREEN_UP} {
        height: ${headerHeightDesktopNormal - 20}px;
      }
    }
  }

  .nav-wrapper {
    align-items: center;

    nav {
      a {
        text-transform: uppercase;

        ${SMALL_SCREEN_ONLY} {
          border-bottom: 1px solid ${palette.primary.main};
          display: block;
          padding: .5rem;
          margin: 0;
        }

        ${MEDIUM_SCREEN_UP} {
          margin-left: 1rem;

          &[aria-current] {
            box-shadow: 0 1px 0 0 currentColor;
          }
        }
      }
    }


    nav nav {
      ${SMALL_SCREEN_ONLY} {
        a {
          padding-left: 1.5rem;
        }
      }

      ${MEDIUM_SCREEN_UP} {
        display: none;
      }
    }

    > nav {
      ${SMALL_SCREEN_ONLY} {
        background: ${Color(palette.primary.main).darken(.2).string()};
        position: absolute;
        top: ${headerHeightMobile}px;
        left: 100vw;
        right: 0;
        height: 100vh;
        width: 100vw;
        transition: left .3s ease-in-out;
      }
    }
  }

  .header-wrapper {
    ${headerFooterStyle}
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }

  .in-view-ref,
  .nav-wrapper {
    transition: height .3s ease-out;

    ${SMALL_SCREEN_ONLY} {
      height: ${headerHeightMobile}px;
    }

    ${MEDIUM_SCREEN_UP} {
      height: ${headerHeightDesktopNormal}px;
    }
  }

  .back-to-top {
    background: ${palette.primary.contrast};
    border: 1px solid ${palette.primary.light};
    border-radius: 0 0 3px 3px;
    color: ${palette.primary.dark};
    cursor: pointer;
    font-size: 2rem;
    height: 4rem;
    width: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    right: -1px;
    bottom: 4rem;
    opacity: 0;
    visibility: hidden;
    transition: all .5s;
    transform: rotate(90deg);
    z-index: 1;
  }

  &.sticky {
    .back-to-top {
      opacity: 1;
      visibility: visible;
    }

    .nav-wrapper,
    .in-view-ref {
      ${MEDIUM_SCREEN_UP} {
        height: ${headerHeightDesktopCollapsed}px;
      }
    }

    .logo {
      svg {
        ${MEDIUM_SCREEN_UP} {
          height: ${headerHeightDesktopCollapsed - 20}px;
        }
      }
    }
  }

  .mobile-menu-opener {
    ${SMALL_SCREEN_ONLY} {
      cursor: pointer;
      line-height: ${headerHeightMobile}px;
      height: ${headerHeightMobile}px;
      width: ${headerHeightMobile}px;
      text-align: center;

      &::before {
        display: block;
        content: '≡';
        font-size: 3rem;
      }
    }

    ${MEDIUM_SCREEN_UP} {
      display: none;
    }
  }

  &.mobile-menu-open {
    .mobile-menu-opener {
      &::before {
        content: '×';
      }
    }

    .nav-wrapper {
      > nav {
        left: 0;
      }
    }
  }
`;

const scrollTop = event => {
  event.preventDefault();
  document.getElementById('header-menu').scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

const toggleMobileMenu = event => {
  event.preventDefault();
  document.getElementById('header-menu').classList.toggle('mobile-menu-open');
  document.querySelector('body').classList.toggle('modal-open');
  document.querySelector('html').classList.toggle('modal-open');
}

const Header = ({wordpressSiteMetadata}) => {
  return (
    <InView>
      {({ inView, ref }) => (
        <HeaderElement id="header-menu" className={inView ? '' : 'sticky '}>
          <div className="header-wrapper">
            <Wrapper className="nav-wrapper">
              <Link
                className="logo"
                to="/"
                alt={ wordpressSiteMetadata.name }
              >
                <Logo />
              </Link>
              <MainMenu />
              <div className="mobile-menu-opener" onClick={toggleMobileMenu} />
            </Wrapper>
          </div>
          <div className="in-view-ref" ref={ref} />
          <span className="back-to-top" onClick={scrollTop}>
            &lsaquo;
          </span>
        </HeaderElement>
      )}
    </InView>
  );
};

const HeaderContainer = () => (
  <StaticQuery
    query={graphql`
      query headerQuery {
        wordpressSiteMetadata {
          name
        }
      }
    `}
    render={Header}
  />
)

export default HeaderContainer
