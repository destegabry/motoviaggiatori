import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
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

const HeaderWrapper = styled.header`
  ${headerFooterStyle}

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
`;

const BackToTop = styled.span`
  background: ${palette.primary.contrast};
  border: 1px solid ${palette.primary.light};
  border-radius: 0 0 3px 3px;
  color: ${palette.primary.dark};
  cursor: pointer;
  font-size: 2rem;
  height: 3rem;
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: -1px;
  bottom: 3rem;
  opacity: 0;
  transition: opacity .5s;
  transform: rotate(90deg);
  z-index: 10;
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
    <HeaderWrapper>
      <Wrapper css={css`
        align-items: center;

        ${SMALL_SCREEN_ONLY} {
          height: 60px;
        }

        ${MEDIUM_SCREEN_UP} {
          height: 100px;
        }
        `}>
        <Link
          className="logo"
          to="/"
          alt={ wordpressSiteMetadata.name }
          style={{
            textDecoration: `none`,
            display: 'inline-block',
            height: '100%',
            width: 'auto'
          }}
        >
          <Logo style={{ height: '100%',  }} />
        </Link>
        <MainMenu />
      </Wrapper>
      <InView>
      {({ inView, ref }) => (
        <div ref={ref}>
          <BackToTop
            css={css`
              opacity: ${inView ? 0 : 1 };
            `}
            onClick={ scrollTop }
          >
            &lsaquo;
          </BackToTop>
        </div>
      )}
      </InView>
    </HeaderWrapper>
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
