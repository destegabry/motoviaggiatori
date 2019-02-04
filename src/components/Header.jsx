import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import Logo from '../images/motoviaggiatori_logo.svg'
import Wrapper from './Wrapper'
import MainMenu from './MainMenu'
import headerFooterStyle from '../utils/headerFooterStyle'
import {
  SMALL_SCREEN_ONLY,
  MEDIUM_SCREEN_UP
} from '../utils/breakpoints'

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

const Header = ({wordpressSiteMetadata}) => (
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
  </HeaderWrapper>
);

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
