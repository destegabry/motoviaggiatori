import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core';

import PostPreview from './PostPreview';

const PostPreviewList = props => {
  return (
    <PostPreview
      {...props}
      featuredImage="square"
      showExcerpt={false}
      css={css`
        display: flex;

        .featured-media {
          flex: 0 0 80px;
          margin-right: 5px;
        }

        h3 {
          font-size: .85rem;
        }
      `}
    />
  );
}

PostPreviewList.propTypes = {
  post: PropTypes.object.isRequired
}

export default PostPreviewList;