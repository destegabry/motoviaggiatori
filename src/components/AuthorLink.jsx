import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import getAuthorUrl from '../utils/getAuthorUrl';

const AuthorLink = ({author}) => (
  <Link
    to={getAuthorUrl(author)}
    title={author.name}
    dangerouslySetInnerHTML={{ __html: author.name }}
  />
)

AuthorLink.propTypes = {
  author: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
}

export default AuthorLink;