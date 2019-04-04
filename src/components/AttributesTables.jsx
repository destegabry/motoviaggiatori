import React from 'react'
import PropTypes from 'prop-types'

const AttributesTable = ({ attributes }) => {
  if (attributes.length === 0) {
    return null;
  }

  return (
    <table>
      <tbody>
        { attributes.map(({key, value}, index) => (
          <tr key={index}>
            <th>{ key }</th>
            <td dangerouslySetInnerHTML={{__html: value}} />
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
  ).isRequired,
}

export default AttributesTable