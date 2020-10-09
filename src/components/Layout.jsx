import React from 'react'
import PropTypes from 'prop-types'
import { useInView } from 'react-intersection-observer'
import { Helmet } from 'react-helmet-async'
import { useWindowHeight } from '@react-hook/window-size'
import { withPrefix } from 'gatsby'
import { css, Global } from '@emotion/core'
import styled from '@emotion/styled'
import moment from 'moment'
import 'moment/locale/it'

import { colors } from '../utils/theme'
import Header from './Header'
import Footer from './Footer'
import DonateBanner from './donate/DonateBanner'

moment.locale('it');

const globalStyles = css`
  html, body {
    background: ${colors.palette.primary.light};
    overflow: hidden;
    height: 100%;
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
  height: 100%;
  margin: 0;
`;

const ScrollWrapper = styled.div`
  flex: 1 0 0%;
  overflow: auto;
`;

const Main = styled.main`
  padding-bottom: 1rem;
  padding-top: 1rem;
`;


const Layout = ({ children, ...otherProps }) => {

  const [ref, inView] = useInView({
    threshold: 0
  });

  const viewportHeight = useWindowHeight()

  return (
    <OuterWrapper {...otherProps} style={{height: viewportHeight}}>
      <Helmet>
        <script src={withPrefix('/pace.min.js')} async></script>
      </Helmet>
      <Global styles={globalStyles} />
      <Header sticky={inView} />
      <ScrollWrapper>
        <div className="in-view-ref" ref={ref} />
        <Main className="wrapper">
          {children}
        </Main>
        <Footer />
      </ScrollWrapper>
      <DonateBanner />
    </OuterWrapper>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
