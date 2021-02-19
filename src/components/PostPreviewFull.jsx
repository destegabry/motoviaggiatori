import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react';

import PostPreview from './PostPreview';

const PostPreviewFull = props => {
  return (
    <PostPreview
      {...props}
      featuredImage="wide"
      css={css`
        .featured-media {
          margin: -10px -10px 5px;
        }

        p {
          font-size: .85em;
          margin: 5px 0 0;
        }
      `}
    />
  );
}

PostPreviewFull.propTypes = {
  post: PropTypes.object.isRequired
}

export default PostPreviewFull;