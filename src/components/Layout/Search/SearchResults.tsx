import React from 'react';
import { connectStateResults, Highlight, Snippet } from 'react-instantsearch-dom';
import { Link } from 'gatsby';

export const SearchResults = connectStateResults(({ searchResults, searchState }) => {
  if (!searchResults || !searchState.query) {
    return null;
  }
  return (
    <div
      className="search-results"
      css={(theme) => ({
        background: theme.palette.background.default,
        borderRadius: theme.spacing(1),
        margin: theme.spacing(1),

        [theme.breakpoints.up('sm')]: {
          marginTop: theme.spacing(2),
        },

        '> a': {
          display: 'block',
          paddingTop: theme.spacing(1),
          paddingBottom: theme.spacing(1),
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),

          '&, &[aria-current]': {
            color: theme.palette.text.primary,
          },

          '&:hover, &:focus': {
            color: theme.palette.text.primary,
            background: theme.palette.accent.light,
            boxShadow: `0 0 ${theme.spacing(1)}px 0 ${theme.palette.accent.light}`,
            outline: 0,

            '.title': {
              textDecoration: 'underline',
            },
          },

          '.title': {
            marginBottom: theme.spacing(0.5),
            fontWeight: theme.typography.fontWeight.bold,
          },

          '.excerpt': {
            fontFamily: theme.typography.body.fontFamily,
          },
        },

        '.no-results': {
          ...theme.typography.caption,
          padding: theme.spacing(2),
          textAlign: 'center',
        },
      })}
    >
      {searchResults.nbHits === 0 ? (
        <div className="no-results">Nessun risultato 😢</div>
      ) : (
        searchResults.hits.map((hit) => (
          <Link to={hit.path} className="search-hit" key={hit.objectID}>
            <div className="title">
              <Highlight attribute="title" hit={hit} tagName="mark" />
            </div>
            <div className="excerpt">
              <Snippet attribute="excerpt" hit={hit} tagName="mark" />
            </div>
          </Link>
        ))
      )}
    </div>
  );
});
