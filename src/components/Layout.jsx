import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
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

  main {
    max-width: 100%;
    padding-bottom: 2rem;
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

const Layout = ({ children }) => {
  return (
    <OuterWrapper>
      <Helmet>
        <script>{`window._epn = {campaign: 5337960068};`}</script>
        <script src="https://epnt.ebay.com/static/epn-smart-tools.js"></script>
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
