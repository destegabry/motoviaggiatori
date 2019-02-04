import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import getCategoryUrl from '../utils/getCategoryUrl';

const CategoryLink = ({category, categories}) => (
  <Link
    to={getCategoryUrl(category, categories)}
    title={category.name}
    dangerouslySetInnerHTML={{ __html: category.name }}
  />
)

CategoryLink.propTypes = {
  category: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  categories: PropTypes.array.isRequired,
}

export default CategoryLink;