import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

import {
  SMALL_SCREEN_ONLY
} from '../utils/breakpoints'
import useAllBanners from '../hooks/use-all-banners'

const Banner = styled.a`
  display: block;
  margin: 1rem 0;

  &:hover {
    box-shadow: 0;
  }


  .gatsby-resp-image-background-image {
    display: none!important;
  }

  .gatsby-resp-image-image {
    margin: 0;
    position: static;
  }
`;

const openBannerLink = url => {
  if (window.ga) {
    window.ga('send', 'event', 'banner', 'click', url, {
      'transport': 'beacon'
    });
  }
}

const BannerArea = (props) => {
  const banners = useAllBanners();
  const [banner, setBanner] = useState(false);

  useEffect(() => {
    if (banners.length > 0) {
      setBanner(banners[Math.ceil(Math.random() * banners.length) - 1].node);
    }
  }, [banners]);

  if (!banner || !banners || banners.length === 0) {
      return null;
  }
  return (
    <Banner 
      href={banner.frontmatter.url}
      onClick={ () => openBannerLink(banner.frontmatter.url) }
      target="_blank"
      rel="noopener noreferrer"
      css={css`${banner.frontmatter.css}`}
      dangerouslySetInnerHTML={ { __html: banner.html } }
      {...props}>
    </Banner>
  );
}

export default BannerArea;