import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'

import useAllBanners from '../hooks/use-all-banners'

const openBannerLink = url => {
  if (window.ga) {
    window.ga('send', 'event', 'banner', 'click', url, {
      'transport': 'beacon'
    });
  }
}

const Banner = (props) => {
  return (
    <a href={props.url}>
      {props.title}
    </a>
  );
}

const BannerArea = (props) => {
  const banners = useAllBanners();
  const [banner, setBanner] = useState(false);

  useEffect(() => {
    if (banners.length > 0) {
      setBanner(banners[Math.ceil(Math.random() * banners.length) - 1].node.frontmatter);

    }
  });

  if (!banners || banners.length === 0) {
      return null;
  }
  return (
    <div
      {...props}
    >
      { !banner ? null :
        <a
          href={banner.url}
          target="blank"
          css={css`
            display:block;
            ${banner.css}`
          }>
          <img src={banner.logo.publicURL} alt={banner.title} />
          <div className="title">{banner.title}</div>
          <div className="subtitle">{banner.subtitle}</div>
          <div className="cta">{banner.cta}</div>
        </a>
      }
    </div>
  );
}

export default BannerArea;