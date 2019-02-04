import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import Color from 'color'
import { SMALL_SCREEN_ONLY } from '../utils/breakpoints'

import headerFooterStyle from '../utils/headerFooterStyle'
import colors from '../utils/colors'
import Logo from '../images/motoviaggiatori_logo.svg'
import MainMenu from './MainMenu'
import Wrapper from './Wrapper'
import Sponsors from './Sponsors'
import PostLink from './PostLink'
import SocialLinks from './SocialLinks'

const FooterWrapper = styled.footer`${headerFooterStyle}`;

const wrapperStyle = css`
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

const logoStyle = css`
  width: 100%;
  max-width: 250px;
`;

const Footer = ({wordpressSiteMetadata, allWordpressPost}) => (
  <FooterWrapper>
    <Wrapper css={wrapperStyle}>
      <FooterColumn>
        <a href="/">
          <Logo css={logoStyle} />
        </a>
        <SocialLinks size={32} />
        <Sponsors />
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
          ©{new Date().getFullYear()} {wordpressSiteMetadata.name} | Powered by <a
            href="https://topsolution.it"
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
        wordpressSiteMetadata {
          name
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
