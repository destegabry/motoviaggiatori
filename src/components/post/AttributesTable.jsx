import React from 'react'
import PropTypes from 'prop-types'

import DangerousHTML from '../DangerousHTML'

const AttributesTable = ({ attributes }) => {
  if (!attributes || attributes.length === 0) {
    return null;
  }

  return (
    <table>
      <tbody>
        { attributes.map(({key, value}, index) => (
          <tr key={index}>
            <th>{ key }</th>
            <DangerousHTML component="td" html={ value } />
          </tr>
        )) }
      </tbody>
    </table>
  );
}

AttributesTable.propTypes = {
  attributes: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
}

export default AttributesTable