import React from 'react'
import PropTypes from 'prop-types'
import { FacebookProvider, Like } from 'react-facebook'

import { useSiteMetadata } from '../../hooks/use-site-metadata'

const FacebookButtons = (props) => {
  const { languageCode, siteUrl } = useSiteMetadata();
  const { slug } = props;

  if (!process.env.GATSBY_FB_APP_ID) {
    return null;
  }

  return (
    <FacebookProvider
      appId={ process.env.GATSBY_FB_APP_ID }
      language={ languageCode }
    >
      <Like
        href={ siteUrl + slug }
        size="large"
        share
      />
    </FacebookProvider>
  );
}

FacebookButtons.propTypes = {
  slug: PropTypes.string.isRequired,
}

export default FacebookButtons;
