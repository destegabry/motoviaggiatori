import React from 'react'
import { Link, withPrefix } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import Color from 'color'

import { useSiteMetadata } from '../hooks/use-site-metadata'
import { useAllPosts } from '../hooks/use-all-posts'
import {
  SMALL_SCREEN_ONLY
} from '../utils/breakpoints'
import headerFooterStyle from '../utils/headerFooterStyle'
import colors from '../utils/colors'
import Logo from './Logo'
import MainMenu from './MainMenu'
import Wrapper from './Wrapper'
import Sponsors from './Sponsors'
import SocialLinks from './SocialLinks'

const FooterWrapper = styled.footer`${headerFooterStyle}`;

const wrapperCss = css`
  padding: 0;

  ${SMALL_SCREEN_ONLY} {
    padding: 10px 0;
    flex-direction: column;
  }

  .logo {
    width: 100%;
    max-width: 180px;
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
  padding-bottom: 5.25em;
`; // padding-bottom is needed to accomodate sticky banners

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
  const allPosts = useAllPosts();

  return (
    <FooterWrapper itemProp="publisher" itemScope itemType="http://schema.org/Organization" id="global-org">
      <meta itemProp={ withPrefix('/images/motoviaggiatori_logo.png') } />
      <meta itemProp="url" content={ siteUrl } />
      <Wrapper css={wrapperCss}>
        <FooterColumn>
          <Logo />
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
            {allPosts.slice(0, 10).map(({node}, index) => (
              <Link
                key={index}
                to={node.frontmatter.slug}
                title={node.frontmatter.title}
              >
                {node.frontmatter.title}
              </Link>
            ))}
          </nav>
        </FooterColumn>
      </Wrapper>
      <Credits>
        <Wrapper css={{justifyContent: 'center'}}>
          <span>
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
          </span>
        </Wrapper>
      </Credits>
    </FooterWrapper>
  );
}


export default Footer
