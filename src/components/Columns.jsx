import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

const ColumnsWrapper = styled.div`
  display: flex;

  > div {
    flex: 0 1 100%;
  }
`;


const Columns = ({ items, breakpoints, ...otherProps }) => {
  const [width, setWidth] = useState(0);

  function updateDimensions() {
    setWidth(document.body.clientWidth)
  }

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  });

  let columns = breakpoints.length + 1;

  for (let i = 0; i < breakpoints.length && columns === breakpoints.length + 1; i++) {
    if (width <= breakpoints[i]) {
      columns = i + 1;
    }
  }

  const groupedItems = items.reduce((groupedItems, item, index) => {
    const column = index % columns;
    groupedItems[column] = groupedItems[column] || [];
    groupedItems[column].push(item);
    return groupedItems;
  }, []);

  return (
    <ColumnsWrapper {...otherProps}>
      {
        groupedItems.map((column, index) => (
          <div key={index}>
            { column }
          </div>
        ))
      }
    </ColumnsWrapper>
  );
}

Columns.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
  breakpoints: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Columns;