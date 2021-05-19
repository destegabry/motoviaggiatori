import React, { useCallback, useState } from 'react';
import { faThumbsDown, faThumbsUp, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DonateButton } from '../Donate';

const LS_VOTES_KEY = 'votes';

type VoteButtonProps = Pick<React.HTMLProps<HTMLButtonElement>, 'title' | 'disabled' | 'className'> & {
  icon: IconDefinition;
  value: number;
  campaign: string;
  onVote: (vote: number) => void;
};

function VoteButton({ icon, campaign, value, onVote, ...buttonProps }: VoteButtonProps) {
  const vote = useCallback(() => {
    onVote(value);
    if (window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'vote',
        event_label: campaign,
        value: value,
      });
    }
  }, [campaign, onVote, value]);

  return (
    <button
      type="button"
      onClick={vote}
      css={(theme) => ({
        fontSize: '1em',
        background: 'transparent',
        border: 0,
        outline: 0,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),

        '&:not(:disabled)': {
          cursor: 'pointer',
        },
      })}
      {...buttonProps}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
}

type VoteProps = {
  campaign: string;
  children: React.ReactNode | React.ReactNode[];
};

let lsVotes: Record<string, number>;
try {
  lsVotes = JSON.parse(window.localStorage.getItem(LS_VOTES_KEY) || '{}');
} catch (err) {
  lsVotes = {};
}

export default function Vote({ campaign, children }: VoteProps): JSX.Element {
  const [votes, setVotes] = useState(lsVotes);

  const handleVote = useCallback(
    (value: number) => {
      votes[campaign] = value;
      setVotes({ ...votes, [campaign]: value });
      window.localStorage.setItem(LS_VOTES_KEY, JSON.stringify(votes));
    },
    [campaign, votes]
  );

  return (
    <section css={{ marginTop: '1em', marginBottom: '1em' }}>
      <div css={{ display: 'flex', alignItems: 'center' }}>
        <div css={(theme) => ({ marginRight: theme.spacing(1) })}>{children}</div>
        <VoteButton
          icon={faThumbsUp}
          campaign={campaign}
          value={+1}
          onVote={handleVote}
          disabled={Boolean(votes[campaign])}
          title="Mi è piaciuto"
          css={(theme) => ({
            color: votes[campaign] === 1 ? theme.palette.success.main : undefined,
          })}
        />
        <VoteButton
          icon={faThumbsDown}
          campaign={campaign}
          value={-1}
          onVote={handleVote}
          disabled={Boolean(votes[campaign])}
          title="Non mi è piaciuto"
          css={(theme) => ({
            marginBottom: -theme.spacing(2),
            color: votes[campaign] === -1 ? theme.palette.error.main : undefined,
          })}
        />
      </div>
      {votes[campaign] > 0 && (
        <div css={(theme) => ({ marginTop: theme.spacing(1) })}>
          Contribuisci a nuovi articoli: &nbsp;
          <DonateButton trackLabel={campaign}>offrici un pieno o una birra!</DonateButton>
        </div>
      )}
    </section>
  );
}
