import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Color from 'color'

import Logo from './Logo'
import MainMenu from './MainMenu'
import SocialLinks from './SocialLinks'
import Flex from './Flex'
import headerFooterStyle from '../utils/headerFooterStyle'
import {
  MEDIUM_SCREEN_DOWN,
  LARGE_SCREEN_UP,
} from '../utils/breakpoints'
import { palette } from '../utils/colors'
import {
  IconHamburger,
  IconClose,
  IconArrowToTop
} from './Icons'

export const headerHeightDesktopNormal = 100;
export const headerHeightDesktopCollapsed = 60;

export const headerHeightMobile = 60;

const HeaderElement = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;

  .logo {
    text-decoration: none;
    display: block;

    svg {
      transition: height .3s ease-out;

      ${MEDIUM_SCREEN_DOWN} {
        height: ${headerHeightMobile - 20}px;
      }

      ${LARGE_SCREEN_UP} {
        height: ${headerHeightDesktopNormal - 20}px;
      }
    }
  }

  .nav-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: .8rem;

    nav {
      z-index: 2;

      a {
        text-transform: uppercase;

        ${MEDIUM_SCREEN_DOWN} {
          display: block;
          border-bottom: 1px solid ${palette.primary.main};
          margin: 0;
          padding: .3rem .5rem;
        }

        ${LARGE_SCREEN_UP} {
          margin-right: 1rem;
        }
      }
    }

    > nav {
      ${MEDIUM_SCREEN_DOWN} {
        background: ${Color(palette.primary.main).darken(.2).string()};
        overflow: auto;
        position: fixed;
        top: ${headerHeightMobile}px;
        bottom: 0;
        right: -100vw;
        width: 100vw;
        transition: right .3s ease-in-out;

        nav {
          a {
            padding-left: 1.5rem;
          }
        }
      }

      ${LARGE_SCREEN_UP} {
        > * {
          padding: 1rem 0;
        }

        > span {
          display: inline-block;
          position: relative;

          &:hover {
            nav {
              visibility: visible;
              opacity: 1;
            }
          }
        }

        nav {
          visibility: hidden;
          opacity: 0;
          position: absolute;
          top: 100%;
          right: 0;
          background: ${Color(palette.primary.main).darken(.2).string()};

          &::before {
            content: '';
            position: absolute;
            right: 1rem;
            top: -1rem;
            height: 0;
            width: 0;
            border-top: .5rem solid transparent;
            border-left: .5rem solid transparent;
            border-right: .5rem solid transparent;
            border-bottom: .5rem solid ${Color(palette.primary.main).darken(.2).string()};
          }

          a {
            display: block;
            margin: 0;
            padding: .3rem 1rem;
            white-space: nowrap;

            :not(:last-child) {
              border-bottom: 1px solid ${palette.primary.main};
            }
          }
        }
      }
    }
  }

  .header-wrapper {
    ${headerFooterStyle}
    box-shadow: ${Color(palette.primary.main).darken(.6).string()} 0 0 .5rem;
    position: relative;
  }

  .nav-wrapper {
    transition: height .3s ease-out;

    ${MEDIUM_SCREEN_DOWN} {
      height: ${headerHeightMobile}px;
    }

    ${LARGE_SCREEN_UP} {
      height: ${headerHeightDesktopNormal}px;
    }
  }

  .back-to-top {
    border-radius: .2rem 0 0 .2rem;
    background: ${Color(palette.primary.light).alpha(.5).string()};
    cursor: pointer;
    height: 2.5rem;
    width: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    right: -1px;
    bottom: -3rem;
    opacity: 0;
    transition: all .3s ease-out;
    z-index: 1;

    svg {
      fill: ${palette.primary.dark};
      height: 1.5rem;
      width: 1.5rem;
    }
  }

  &.sticky {
    .back-to-top {
      bottom: 5rem;
      opacity: 1;
    }

    .nav-wrapper {
      ${LARGE_SCREEN_UP} {
        height: ${headerHeightDesktopCollapsed}px;
      }
    }

    .logo {
      svg {
        ${LARGE_SCREEN_UP} {
          height: ${headerHeightDesktopCollapsed - 20}px;
        }
      }
    }
  }

  .mobile-menu-opener {
    ${MEDIUM_SCREEN_DOWN} {
      cursor: pointer;
      text-align: center;
      height: 1.5rem;

      svg {
        fill: rgba(255,255,255,0.65);
        height: 1.5rem;
        width: 1.5rem;
      }

      &:hover {
        svg {
          fill: ${palette.primary.contrast};
        }
      }
    }

    ${LARGE_SCREEN_UP} {
      display: none;
    }
  }

  &.mobile-menu-open {
    .nav-wrapper {
      > nav {
        right: 0;
      }
    }
  }

  .social-links {
    > a {
      background: transparent;
      opacity: .65;

      &:hover {
        opacity: 1;
      }
    }
  }
`;

const scrollTop = event => {
  event.preventDefault();
  document.getElementsByClassName('in-view-ref')[0]
    .scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
}

const Header = ({ sticky }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    document.querySelector('body').classList.toggle('modal-open', !mobileMenuOpen);
    document.querySelector('html').classList.toggle('modal-open', !mobileMenuOpen);
    setMobileMenuOpen(!mobileMenuOpen);
  }

  return (
    <HeaderElement
      id="header-menu"
      className={ [
        sticky ? '' : 'sticky ',
        mobileMenuOpen ? 'mobile-menu-open' : ''
      ].join(' ') }
    >
      <div className="header-wrapper">
        <div className="wrapper nav-wrapper">
          <Logo />
          <Flex />
          <MainMenu />
          <SocialLinks size={24} hideMail iconStyle={{ marginRight: 12 }} />
          <div
            className="mobile-menu-opener"
            onClick={ () => toggleMobileMenu() }
          >
            { mobileMenuOpen ? <IconClose /> : <IconHamburger />}
          </div>
        </div>
      </div>
      <span className="back-to-top" onClick={scrollTop}>
        <IconArrowToTop />
      </span>
    </HeaderElement>
  )
}


Header.propTypes = {
  sticky: PropTypes.bool,
}

export default Header
