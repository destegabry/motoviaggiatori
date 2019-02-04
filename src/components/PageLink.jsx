import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import getPageUrl from '../utils/getPageUrl';

const PageLink = ({page}) => (
  <Link
    to={getPageUrl(page)}
    title={page.title}
    dangerouslySetInnerHTML={{ __html: page.title }}
  />
)

PageLink.propTypes = {
  page: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
}

export default PageLink;