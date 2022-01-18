import React from 'react';
import { SearchBoxProvided } from 'react-instantsearch-core';
import { connectSearchBox } from 'react-instantsearch-dom';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type SearchBoxProps = SearchBoxProvided & {
  onCloseClick: () => void;
};

export const SearchBox = connectSearchBox((props: SearchBoxProps) => {
  const { onCloseClick, currentRefinement, refine } = props;
  return (
    <div
      className="search-box"
      css={(theme) => ({
        position: 'relative',
        margin: theme.spacing(1),

        [theme.breakpoints.up('sm')]: {
          marginTop: theme.spacing(4),
        },

        '> *': {
          border: 'none',
          fontSize: theme.typography.h3.fontSize,
          outline: 0,
        },

        '.search-box-input': {
          background: theme.palette.background.default,
          borderRadius: theme.spacing(1),
          display: 'block',
          width: '100%',
          paddingTop: theme.spacing(1),
          paddingBottom: theme.spacing(1),
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(7),
          '&:focus': {
            boxShadow: `0 0 ${theme.spacing(1)}px 0 ${theme.palette.primary.light}`,
          },
        },

        '.search-box-close': {
          background: 'none',
          borderRadius: theme.spacing(1),
          paddingBottom: theme.spacing(1),
          paddingTop: theme.spacing(1),
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          '&:focus': {
            color: theme.palette.primary.light,
          },
        },
      })}
    >
      <input
        type="text"
        placeholder="Cerca..."
        aria-label="Cerca"
        className="search-box-input"
        onChange={(event) => refine(event.target.value)}
        onKeyUp={(event) => {
          if (event.key === 'Escape') {
            onCloseClick();
          }
        }}
        value={currentRefinement}
        autoFocus
      />
      <button className="search-box-close" onClick={onCloseClick} title="Chiudi ricerca">
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
});
