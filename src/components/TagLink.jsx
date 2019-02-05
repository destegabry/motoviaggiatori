import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import getTagUrl from '../utils/getTagUrl';

const TagLink = ({tag}) => (
  <Link
    to={getTagUrl(tag)}
    title={tag.name}
    dangerouslySetInnerHTML={{ __html: tag.name }}
  />
)

TagLink.propTypes = {
  tag: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
}

export default TagLink;