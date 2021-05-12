import React from 'react';
import {
  faFacebookSquare as FacebookIcon,
  faInstagram as InstagramIcon,
  faYoutubeSquare as YoutubeIcon,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelopeSquare as EmailIcon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SocialIcons(): JSX.Element {
  return (
    <div
      css={(theme) => ({
        display: 'flex',
        justifyContent: 'center',
        a: {
          display: 'inline-block',
          paddingLeft: theme.spacing(1),
          paddingRight: theme.spacing(1),
        },
      })}
    >
      <a href="mailto:info@motoviaggiatori.it" title="Email">
        <FontAwesomeIcon icon={EmailIcon} />
      </a>
      <a href="https://facebook.com/motoviaggiatori" title="Facebook" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={FacebookIcon} />
      </a>
      <a href="https://instagram.com/motoviaggiatori" title="Instagram" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={InstagramIcon} />
      </a>
      <a
        href="https://www.youtube.com/channel/UCTa8R7tJ7GDWTVKh0CF9w2w"
        title="YouTube"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={YoutubeIcon} />
      </a>
    </div>
  );
}
