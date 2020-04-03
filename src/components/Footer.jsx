import React from 'react'
import { withPrefix } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import { useSiteMetadata } from '../hooks/use-site-metadata'
import {
  SMALL_SCREEN_ONLY,
} from '../utils/breakpoints'
import headerFooterStyle from '../utils/headerFooterStyle'
import Logo from './Logo'
import Sponsors from './Sponsors'
import SocialLinks from './SocialLinks'

const FooterWrapper = styled.footer`
  ${headerFooterStyle}
  padding: .5rem 0;

  .row {
    display: flex;

    ${SMALL_SCREEN_ONLY} {
      flex-direction: column;
    }
  }

  .column {
    padding: .5rem .25rem;
    flex: 1 0 0%;
    display: flex;
    flex-direction: column;

    h4 {
      color: inherit;
      margin-top: 0;
      text-transform: uppercase;
    }
  }

  .logo-wrapper {
    align-items: center;
    flex: 0 0 12rem;
  }

  .logo {
    width: 100%;
    max-width: 10rem;
  }

  .credits {
    font-size: .7rem;
    text-align: center;
    padding: .5rem 0;
  }
`;

const sponsorsCss = css`
  h4 {
    flex: 1 0 100%;
  }
`;

const MobileLineBreaker = styled.span`
  ${SMALL_SCREEN_ONLY} {
    display: block;
    visibility: hidden;
    height: 0px;
    width: 100%;
  }
`;

const Footer = () => {
  const { name, version, siteUrl, repositoryUrl } = useSiteMetadata();

  return (
    <FooterWrapper itemProp="publisher" itemScope itemType="http://schema.org/Organization" id="global-org">
      <meta itemProp={ withPrefix('/images/motoviaggiatori_logo.png') } />
      <meta itemProp="url" content={ siteUrl } />
      <div className="wrapper row">
        <div className="column logo-wrapper">
          <Logo />
          <SocialLinks size={32} />
        </div>
        <div className="column sponsor-wrapper">
          <Sponsors css={sponsorsCss} />
        </div>
      </div>
      <div className="wrapper credits">
        <span>©{new Date().getFullYear()}</span>
        &nbsp;
        <span itemProp="name">
          {name}
        </span> | <a
          href={repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          v{version}
        </a>
        <MobileLineBreaker> | </MobileLineBreaker>
        <a href="/privacy-policy">
          Privacy policy
        </a> | Powered by <a
          href="https://www.topsolution.it"
          target="_blank"
          rel="noopener noreferrer"
        >Top Solution</a>
      </div>
    </FooterWrapper>
  );
}

export default Footer
