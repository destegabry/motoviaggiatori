import React, { useState } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import algoliasearch from 'algoliasearch/lite';
import { SearchBox } from './SearchBox';
import { SearchResults } from './SearchResults';

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID || '',
  process.env.GATSBY_ALGOLIA_SEARCH_KEY || ''
);

export function Search(): JSX.Element {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <button onClick={() => setSearchOpen(true)} title="Cerca" className="icon-button">
        <FontAwesomeIcon icon={faSearch} />
      </button>
      {searchOpen && (
        <div
          css={(theme) => ({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',

            '&, .backdrop': {
              position: 'fixed',
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            },
            '.backdrop': {
              background: theme.palette.text.disabled,
              zIndex: -1,
            },
            '.search-wrapper': {
              width: '100%',
              maxHeight: '100%',
              maxWidth: theme.breakpoints.values.sm,
              borderRadius: theme.spacing(1),
              color: theme.palette.text.primary,
              display: 'flex',
              flexDirection: 'column',
            },
            '.search-results': {
              flex: '1 1 0%',
              overflow: 'auto',
            },
          })}
        >
          <div className="backdrop" onClick={() => setSearchOpen(false)}></div>
          <div className="search-wrapper">
            <InstantSearch searchClient={searchClient} indexName={process.env.GATSBY_ALGOLIA_SEARCH_INDEX || ''}>
              <SearchBox onCloseClick={() => setSearchOpen(false)} />
              <SearchResults />
            </InstantSearch>
          </div>
        </div>
      )}
    </>
  );
}
