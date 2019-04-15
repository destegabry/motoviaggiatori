import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import { green, red, palette } from '../../utils/colors'
import UpVote from './up.svg';
import DownVote from './down.svg';

const VoteContainer = styled.span`
  button {
    background: transparent;
    border: 0;
    margin-left: .5rem;
    padding: 0;
    vertical-align: middle;
    fill: ${palette.primary.main};

    &:not(:disabled) {
      cursor: pointer;

      &:hover,
      &:active {
        fill: ${palette.secondary.dark};
      }
    }

    &:disabled {
      fill: ${palette.grey.light}
    }

    svg {
      height: 2rem;
    }
  }
`;

const LS_VOTES_KEY = 'votes';

function Vote({ campaign }) {
  let votes;
  try {
    votes = JSON.parse(window.localStorage.getItem(LS_VOTES_KEY)) || {};
  } catch (err) {
    votes = {};
  }
  const [voted, setVoted] = useState(votes[campaign] || 0);

  function vote(value) {
    try {
      if (votes[campaign] === value) {
        return; // can't repeat the vote, bye!
      }
      votes[campaign] = value;
      window.localStorage.setItem(LS_VOTES_KEY, JSON.stringify(votes));

      setVoted(value);

      window.ga('send', 'event', campaign, {
        eventCategory: 'vote',
        eventAction: 'click',
        eventLabel: campaign,
        eventValue: value,
        transport: 'beacon'
      });
    } catch (err) {}
  }

  return (
    <VoteContainer>
      <button
        aria-label="Mi è piaciuto"
        disabled={ voted !== 0 }
        onClick={ () => vote(+1) }
      >
        <UpVote css={ voted < 1 ? null : css`fill: ${green};` } />
      </button>
      <button
        aria-label="Non mi è piaciuto"
        disabled={ voted !== 0 }
        onClick={ () => vote(-1) }
      >
        <DownVote css={ voted > -1 ? null : css`fill: ${red};` } />
      </button>
    </VoteContainer>
  )
}

Vote.propTypes = {
  campaign: PropTypes.string.isRequired,
}

export default Vote;