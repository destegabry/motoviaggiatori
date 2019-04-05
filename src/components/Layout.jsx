import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { withPrefix } from 'gatsby'
import { css, Global } from '@emotion/core'
import styled from '@emotion/styled'
import moment from 'moment'
import 'moment/locale/it'

import { colors } from '../utils/theme'
import Wrapper from './Wrapper'
import Header from './Header'
import Footer from './Footer'

moment.locale('it');

const globalStyles = css`
  html, body {
    background: ${colors.palette.primary.light};
  }

  body {
    > img {
      display: block;
      height: 0;
    }
  }

  .modal-open {
    overflow: hidden;
    -webkit-overflow-scrolling: auto;
  }

  main {
    max-width: 100%;
    padding-bottom: 2rem;
  }

  .pace {
    -webkit-pointer-events: none;
    pointer-events: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;

    .pace-progress {
      background: ${colors.palette.secondary.main};
      position: fixed;
      z-index: 2000;
      top: 0;
      right: 100%;
      width: 100%;
      height: 2px;
    }
  }

  .pace-inactive {
    display: none;
  }
`;

const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  display: block;
  width: 100%;
`;

const Layout = ({ children, ...otherProps }) => {
  return (
    <OuterWrapper {...otherProps}>
      <Helmet>
        <script>{`window._epn = {campaign: 5337960068};`}</script>
        <script src="https://epnt.ebay.com/static/epn-smart-tools.js" async></script>
        <script src={withPrefix('/pace.min.js')}></script>
      </Helmet>
      <Global styles={globalStyles} />
      <Header />
      <Wrapper css={css`flex: 1 0 100%;`}>
        <Main>
          {children}
        </Main>
        {/* <aside></aside> */}
      </Wrapper>
      <Footer />
    </OuterWrapper>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
