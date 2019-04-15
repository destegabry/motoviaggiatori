import React from 'react'
import PropTypes from 'prop-types'

const DangerousHTML = ({ component, html, ...otherProps }) => {
  if(!html) {
    return null
  }
  const Component = component || 'div';
  return <Component
    dangerouslySetInnerHTML={ { __html: html } }
    { ...otherProps }
  />
}

DangerousHTML.propTypes = {
  html: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.func
  ])
};

export default DangerousHTML;