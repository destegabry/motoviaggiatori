import React from 'react'
import PropTypes from 'prop-types'

const DonateButton = ({trackLabel, children, ...otherProps}) => {
  function donate(event) {
    event.preventDefault()
    if (window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'donate',
        event_label: trackLabel,
      });
    }
    window.location.href = `https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=${process.env.GATSBY_PAYPAL_DONATE_ID}&source=url`
  }

  return (
    <button {...otherProps} onClick={donate}>{children}</button>
  );
}

DonateButton.propTypes = {
  trackLabel: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default DonateButton;