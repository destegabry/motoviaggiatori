import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet-async'
import { withPrefix } from 'gatsby'
import { css, Global } from '@emotion/core'
import styled from '@emotion/styled'
import moment from 'moment'
import 'moment/locale/it'

import { colors } from '../utils/theme'
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

  .wrapper {
    flex-grow: 1;
    margin: 0 auto;
    padding: 0 1rem;
    width: 100%;
    max-width: 1280px;
  }

  .pace {
    pointer-events: none;
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
  background: ${colors.palette.primary.light};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
`;

const Main = styled.main`
  padding-bottom: 1rem;
  padding-top: 1rem;
`;

const Layout = ({ children, ...otherProps }) => {
  return (
    <OuterWrapper {...otherProps}>
      <Helmet>
        <script src={withPrefix('/pace.min.js')} async></script>
      </Helmet>
      <Global styles={globalStyles} />
      <Header />
      <Main className="wrapper">
        {children}
      </Main>
      <Footer />
    </OuterWrapper>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
