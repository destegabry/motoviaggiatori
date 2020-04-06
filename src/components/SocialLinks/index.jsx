import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import Facebook from './facebook.svg'
import Instagram from './instagram.svg'
import Email from './gmail.svg'
import Youtube from './youtube.svg'
import Website from './website.svg'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-cotnent: center;
`;

const Link = styled.a`
  display: block;
  border-radius: 7%;
  box-sizing: border-box;

  svg {
    fill: white;
  }
`;

const SocialLinks = ({size, hideMail, iconStyle}) => {
  const style = {
    height: size,
    width: size,
    margin: size / 8,
    ...iconStyle
  };

  return (
    <Wrapper className="social-links">
      { hideMail ? null :
        <Link
          href="mailto:info@motoviaggiatori.it"
          title="Email"
          style={style}
          className="email"
        >
          <Email />
        </Link>
      }
      <Link
        href="https://facebook.com/motoviaggiatori"
        title="Facebook"
        style={style}
        className="facebook"
      >
        <Facebook />
      </Link>
      <Link
        href="https://instagram.com/motoviaggiatori"
        title="Instagram"
        style={style}
        className="instagram"
      >
        <Instagram />
      </Link>
      <Link
        href="https://www.youtube.com/channel/UCTa8R7tJ7GDWTVKh0CF9w2w"
        title="YouTube"
        style={style}
        className="youtube"
      >
        <Youtube />
      </Link>
    </Wrapper>
  )
}

SocialLinks.propTypes = {
  size: PropTypes.number.isRequired,
  hideMail: PropTypes.bool,
  iconStyle: PropTypes.object,
}


SocialLinks.defaultProps = {
  hideMail: false
}

export {
  Facebook,
  Instagram,
  Email,
  Youtube,
  Website
}

export default SocialLinks;