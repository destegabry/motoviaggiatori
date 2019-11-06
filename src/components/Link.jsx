import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

import { palette } from '../utils/colors'

const linkStyle = css`
  svg {
    fill: ${palette.secondary.dark};
    height: .8rem;
    margin-left: .5rem;
  }
`;

const CustomLink = ({
  icon,
  children,
  ...otherProps
}) => {
  return (
  <Link {...otherProps} css={linkStyle}>
    {children}
    { icon ? icon : null }
  </Link>
  )
}

CustomLink.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.node,
}

export default CustomLink