import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { InView } from 'react-intersection-observer'

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

const headerHeightMobileNormal = 60;
const headerHeightMobileCollapsed = 50;

const HeaderElement = styled.header`
  .logo {
    text-decoration: none;
    display: block;

    svg {
      transition: height .3s ease-out;

      ${SMALL_SCREEN_ONLY} {
        height: ${headerHeightMobileNormal - 20}px;
      }

      ${MEDIUM_SCREEN_UP} {
        height: ${headerHeightDesktopNormal - 20}px;
      }
    }
  }

  .nav-wrapper {
    align-items: center;
  }

  .header-wrapper {
    ${headerFooterStyle}
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;

    nav a {
      margin-left: 1rem;
      text-transform: uppercase;

      &[aria-current] {
        box-shadow: 0 1px 0 0 currentColor;
      }
    }

    nav nav {
      display: none;
    }
  }

  .in-view-ref,
  .nav-wrapper {
    transition: height .3s ease-out;

    ${SMALL_SCREEN_ONLY} {
      height: ${headerHeightMobileNormal}px;
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
    z-index: 10;
  }

  &.sticky {
    .back-to-top {
      opacity: 1;
      visibility: visible;
    }

    .nav-wrapper,
    .in-view-ref {
      ${SMALL_SCREEN_ONLY} {
        height: ${headerHeightMobileCollapsed}px;
      }

      ${MEDIUM_SCREEN_UP} {
        height: ${headerHeightDesktopCollapsed}px;
      }
    }

    .logo {
      svg {
        ${SMALL_SCREEN_ONLY} {
          height: ${headerHeightMobileCollapsed - 20}px;
        }

        ${MEDIUM_SCREEN_UP} {
          height: ${headerHeightDesktopCollapsed - 20}px;
        }
      }
    }
  }
`;

const scrollTop = event => {
  event.preventDefault();
  document.querySelector('header').scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });;
}

const Header = ({wordpressSiteMetadata}) => {
  return (
    <InView>
      {({ inView, ref }) => (
        <HeaderElement className={inView ? '' : 'sticky '}>
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
