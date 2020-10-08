import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import { green, red, palette } from '../../../utils/colors'
import UpVote from './up.svg';
import DownVote from './down.svg';
import DonateButton from '../../donate/DonateButton'

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

const DonateCotainer = styled.span`
  .donate-button {
    background: ${palette.grey.light};
    color: ${palette.secondary.dark};
    cursor: pointer;
    border: 0;
    padding: .25rem .75rem;
    border-radius: 1rem;
    border: 0;
    outline: 0;

    &:active,
    &:hover {
      box-shadow: 0 1px 0 0 currentColor;
    }
  }
`;

const LS_VOTES_KEY = 'votes';

function Vote({ campaign, children }) {
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

      window.gtag('event', 'click', {
        event_category: 'vote',
        event_label: campaign,
        value: value,
      });
    } catch (err) {}
  }

  return (
    <>
      {children}
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
      { voted > 0 &&
        <DonateCotainer>
          &nbsp;
          Contribuisci a nuovi articoli:
          &nbsp;
          <DonateButton trackLabel={campaign} className="donate-button">
            offrici un pieno o una birra!
          </DonateButton>
        </DonateCotainer>
      }
    </>
  )
}

Vote.propTypes = {
  campaign: PropTypes.string.isRequired,
}

export default Vote;