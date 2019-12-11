import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useInView } from 'react-intersection-observer'
import { css } from '@emotion/core'

import useAllBanners from '../hooks/use-all-banners'

const bannerStyle = css`
  margin: 1em 0;

  a {
    height: 7em;
    bottom: -5em;
    transition: bottom .3s ease-out;

    &:hover {
      box-shadow: none;
    }

    &.sticky {
      font-size: .9em;
      height: 5em;
      position: fixed;
      margin: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }
  }
`;

const openBannerLink = url => {
  if (window.ga) {
    window.ga('send', 'event', 'banner', 'click', url, {
      'transport': 'beacon'
    });
  }
}

const Banner = ({sticky, style, ...otherProps}) => {
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
    <div ref={ref} css={[ bannerStyle, style ]} {...otherProps}>
      <a
        href={banner.frontmatter.url}
        target="_blank"
        rel="noopener noreferrer"
        ref={ref}
        onClick={ () => openBannerLink(banner.frontmatter.url) }
        className={ sticky && hasBeenViewed && !inView ? 'sticky' : '' }
        css={css`${banner.frontmatter.css}`}
        dangerouslySetInnerHTML={ { __html: banner.html } }
      />
    </div>
  );
}

Banner.propTypes = {
  sticky: PropTypes.bool,
}

export default Banner;