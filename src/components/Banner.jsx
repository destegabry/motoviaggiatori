import React, { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { css } from '@emotion/core'

import {
  SMALL_SCREEN_ONLY,
  MEDIUM_SCREEN_UP
} from '../utils/breakpoints'
import useAllBanners from '../hooks/use-all-banners'

const style = css`
  margin: 1rem 0;

  ${SMALL_SCREEN_ONLY} {
    height: 100px;
  }

  ${MEDIUM_SCREEN_UP} {
    height: 120px;
  }

  a {
    bottom: -100px;
    transition: bottom .3s ease-out;

    ${SMALL_SCREEN_ONLY} {
      height: 100px;
    }
  
    ${MEDIUM_SCREEN_UP} {
      height: 120px;
    }
 
    &:hover {
      box-shadow: 0;
    }

    &.sticky {
      position: fixed;
      margin: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }
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

const Banner = (props) => {
  const banners = useAllBanners();
  const [banner, setBanner] = useState(false);
  const [hasBeenViewed, setHasBeenViewed] = useState(false);

  const [ref, inView] = useInView({
    threshold: 0
  })

  if (inView && !hasBeenViewed) {
    setHasBeenViewed(true);
  }

  useEffect(() => {
    if (banners.length > 0) {
      setBanner(banners[Math.ceil(Math.random() * banners.length) - 1].node);
    }
  }, [banners]);

  if (!banner || !banners || banners.length === 0) {
    return null;
  }
  return (
    <div ref={ref} css={style} {...props}>
      <a 
        href={banner.frontmatter.url}
        target="_blank"
        rel="noopener noreferrer"
        ref={ref}
        onClick={ () => openBannerLink(banner.frontmatter.url) }
        className={ props.sticky && hasBeenViewed && !inView ? 'sticky' : '' }
        css={css`${banner.frontmatter.css}`}
        dangerouslySetInnerHTML={ { __html: banner.html } }
      />
    </div>
  );
}

export default Banner;