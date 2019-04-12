import React, { Component } from 'react'
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

class Vote extends Component {
  constructor(props) {
    super(props);
    this.campaign = props.campaign;
    const votes = this.getSavedVotes();
    this.state = {
      voted: votes[this.campaign] || 0
    };
    this.vote = this.vote.bind(this);
  }

  getSavedVotes() {
    try {
      return JSON.parse(window.localStorage.getItem(LS_VOTES_KEY)) || {};
    } catch (err) {
      return {};
    }
  }

  vote(value) {
    if (window.localStorage) {
      const votes = this.getSavedVotes();
      if (votes[this.campaign] === value) {
        return; // can't repeat the vote, bye!
      } else {
        votes[this.campaign] = value;
      }
      window.localStorage.setItem(LS_VOTES_KEY, JSON.stringify(votes));
    }
    if (window.ga) {
      window.ga('send', 'event', this.campaign, {
        eventCategory: 'vote',
        eventAction: 'click',
        eventLabel: this.campaign,
        eventValue: value,
        transport: 'beacon'
      });
    }

    this.setState({ voted: value });
  }

  render() {
    return (
      <VoteContainer>
        <button
          aria-label="Mi è piaciuto"
          disabled={ this.state.voted !== 0 }
          onClick={ () => this.vote(+1) }
        >
          <UpVote css={ this.state.voted < 1 ? null : css`fill: ${green};` } />
        </button>
        <button
          aria-label="Non mi è piaciuto"
          disabled={ this.state.voted !== 0 }
          onClick={ () => this.vote(-1) }
        >
          <DownVote css={ this.state.voted > -1 ? null : css`fill: ${red};` } />
        </button>
      </VoteContainer>
    )
  }
}

Vote.propTypes = {
  campaign: PropTypes.string.isRequired,
}

export default Vote;