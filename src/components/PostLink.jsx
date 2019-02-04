import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import getPostUrl from '../utils/getPostUrl';

const PostLink = ({post}) => (
  <Link
    to={getPostUrl(post)}
    title={post.title}
    dangerouslySetInnerHTML={{ __html: post.title }}
  />
)

PostLink.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
}

export default PostLink;