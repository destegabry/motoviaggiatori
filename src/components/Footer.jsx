import React from 'react'
import { withPrefix } from 'gatsby'

import { useSiteMetadata } from '../hooks/use-site-metadata'
import Logo from './Logo'
import Sponsors from './Sponsors'
import SocialLinks from './SocialLinks'

const Footer = () => {
  const { name, version, siteUrl, repositoryUrl } = useSiteMetadata();

  return (
    <footer itemProp="publisher" itemScope itemType="http://schema.org/Organization" id="global-org">
      <meta itemProp={ withPrefix('/images/motoviaggiatori_logo.png') } />
      <meta itemProp="url" content={ siteUrl } />
      <div className="wrapper row">
        <div className="column logo-wrapper">
          <Logo />
          <SocialLinks size={32} />
        </div>
        <div className="column sponsor-wrapper">
          <Sponsors />
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
        <span className="mobile-line-breaker"> | </span>
        <a href="/privacy-policy">
          Privacy policy
        </a> | Powered by <a
          href="https://www.topsolution.it"
          target="_blank"
          rel="noopener noreferrer"
        >Top Solution</a>
      </div>
    </footer>
  );
}

export default Footer
