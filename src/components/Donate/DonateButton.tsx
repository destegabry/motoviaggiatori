import React, { useCallback } from 'react';

type DonateButtonProps = Pick<React.HTMLProps<HTMLAnchorElement>, 'title' | 'disabled' | 'className'> & {
  trackLabel: string;
  children: React.ReactNode | React.ReactNode[];
};

export default function DonateButton({ trackLabel, children, ...anchorProps }: DonateButtonProps): JSX.Element {
  const donate = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      if (window.gtag) {
        window.gtag('event', 'click', {
          event_category: 'donate',
          event_label: trackLabel,
        });
      }
      window.location.href = event.currentTarget.href;
    },
    [trackLabel]
  );

  return (
    <a
      href={`https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=${process.env.GATSBY_PAYPAL_DONATE_ID}&source=url`}
      onClick={donate}
      {...anchorProps}
    >
      {children}
    </a>
  );
}
