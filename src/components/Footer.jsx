import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import Color from 'color'
import {
  SMALL_SCREEN_ONLY,
  MEDIUM_SCREEN_UP
} from '../utils/breakpoints'

import headerFooterStyle from '../utils/headerFooterStyle'
import colors from '../utils/colors'
import Logo from '../images/motoviaggiatori_logo.svg'
import LogoRaster from '../images/motoviaggiatori_logo.png'
import MainMenu from './MainMenu'
import Wrapper from './Wrapper'
import Sponsors from './Sponsors'
import PostLink from './PostLink'
import SocialLinks from './SocialLinks'

const FooterWrapper = styled.footer`${headerFooterStyle}`;

const wrapperCss = css`
  padding: 0;

  ${SMALL_SCREEN_ONLY} {
    padding: 10px 0;
    flex-direction: column;
  }

  nav {
    font-size: .85rem;
    width: 100%;

    a {
      display: block;
      padding: .75rem 0;

      &:not(:last-child) {
        border-bottom: 1px solid ${Color(colors.palette.primary.contrast).alpha(.3).string()};
      }
    }

    nav {
      border-bottom: 1px solid ${Color(colors.palette.primary.contrast).alpha(.3).string()};

      a {
        padding-left: 1.5rem;
      }
    }

  }

  .social-links {
    margin-bottom: 1.5rem;
  }
`;

const FooterColumn = styled.div`
  padding: 20px 10px;
  flex: 0 0 32%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h4 {
    color: inherit;
    font-weight: 400;
    margin-top: 0;
    text-transform: uppercase;
  }
`;

const Credits = styled.div`
  background: ${colors.palette.primary.dark};
  font-size: .85rem;
  text-align: center;
`;

const logoCss = css`
  width: 100%;
  max-width: 250px;
`;

const sponsorsCss = css`
  ${MEDIUM_SCREEN_UP} {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;

    h4 {
      flex: 1 0 100%;
    }

    > a {
      flex: 0 1 48%;
    }
  }
`;

const Footer = ({site, allWordpressPost}) => (
  <FooterWrapper itemProp="publisher" itemScope itemType="http://schema.org/Organization" id="global-org">
    <meta itemProp="logo" content={ site.siteMetadata.siteUrl + LogoRaster } />
    <Wrapper css={wrapperCss}>
      <FooterColumn>
        <a itemProp="url" href={ site.siteMetadata.siteUrl }>
          <Logo css={logoCss} />
        </a>
        <SocialLinks size={32} />
        <Sponsors css={sponsorsCss} />
      </FooterColumn>
      <FooterColumn>
        <h4>Site map</h4>
        <MainMenu />
      </FooterColumn>
      <FooterColumn>
        <h4>Post recenti</h4>
        <nav>
          {allWordpressPost.edges.slice(0, 10).map(({node}) => (
            <PostLink key={node.id} post={node} />
          ))}
        </nav>
      </FooterColumn>
    </Wrapper>
    <Credits>
      <Wrapper css={{justifyContent: 'center'}}>
        <span>
          <span>©{new Date().getFullYear()}</span> <span itemProp="name">
            {site.siteMetadata.name}</span> | <span>v{site.siteMetadata.version}
          </span> | Powered by <a
            href="https://www.topsolution.it"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            Top Solution
          </a>
        </span>
      </Wrapper>
    </Credits>
  </FooterWrapper>
);

const FooterContainer = () => (
  <StaticQuery
    query={graphql`
      query footerQuery {
        site {
          siteMetadata {
            siteUrl
            name
            version
          }
        }
        allWordpressPost {
          edges {
            node {
              id
              title
              slug
              date
            }
          }
        }
      }
    `}
    render={Footer}
  />
)

export default FooterContainer
