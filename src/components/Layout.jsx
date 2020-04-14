import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet-async'
import { withPrefix } from 'gatsby'
import styled from '@emotion/styled'
import moment from 'moment'
import 'moment/locale/it'

import { colors } from '../utils/theme'
import Header from './Header'
import Footer from './Footer'

moment.locale('it');

const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
`;

const Main = styled.main`
  padding: 1rem;
`;

const Layout = ({ children, ...otherProps }) => {
  return (
    <OuterWrapper {...otherProps}>
      <Helmet>
        <script src={withPrefix('/pace.min.js')} async></script>
      </Helmet>
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
