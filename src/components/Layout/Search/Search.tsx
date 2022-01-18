import React, { useCallback, useState } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import algoliasearch from 'algoliasearch/lite';
import { useLockPageScroll } from '../../../hooks/useLockPageScroll';
import { SearchBox } from './SearchBox';
import { SearchResults } from './SearchResults';

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID || '',
  process.env.GATSBY_ALGOLIA_SEARCH_KEY || ''
);

export function Search(): JSX.Element {
  const [searchOpen, setSearchOpen] = useState(false);
  const { lockPageScroll, unlockPageScroll } = useLockPageScroll();

  const open = useCallback(() => {
    lockPageScroll();
    setSearchOpen(true);
  }, [lockPageScroll]);

  const close = useCallback(() => {
    unlockPageScroll();
    setSearchOpen(false);
  }, [unlockPageScroll]);

  return (
    <>
      <button onClick={open} title="Cerca" className="icon-button">
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
          <div className="backdrop" onClick={close}></div>
          <div className="search-wrapper">
            <InstantSearch searchClient={searchClient} indexName={process.env.GATSBY_ALGOLIA_SEARCH_INDEX || ''}>
              <SearchBox onCloseClick={close} />
              <SearchResults />
            </InstantSearch>
          </div>
        </div>
      )}
    </>
  );
}
