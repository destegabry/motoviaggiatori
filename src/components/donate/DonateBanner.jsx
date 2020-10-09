import React, {useState, useEffect} from 'react'
import styled from '@emotion/styled'

import DonateButton from './DonateButton'
import { palette } from '../../utils/colors'
import { altFontStack } from '../../utils/theme'
import { IconClose } from '../Icons'

const bannerHeight = '2rem';
const LS_HIDE_DONATE_KEY = 'hideDonate';


const DonateBannerWrapper = styled.div`
  background: ${palette.secondary.main};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  height: 0;
  transition: height .5s;

  &.show {
    height: ${bannerHeight};

    @supports (margin-bottom: env(safe-area-inset-bottom)) {
      height: calc(env(safe-area-inset-bottom) + ${bannerHeight});
    }
  }

  .wrapper {
    display: flex;
    align-items: center;
  }

  button {
    flex: 1;
    background: transparent;
    border: 0;
    outline: 0;
    cursor: pointer;
    height: ${bannerHeight};
    line-height: ${bannerHeight};
    font-family: ${altFontStack.join(',')};
    font-size: .65rem;

    &:active {
      text-decoration: underline;
    }
  }

  svg {
    height: .75rem;
    cursor: pointer;
  }
`

const Header = ({ sticky }) => {
  const [hidden, setHidden] = useState(true)

  function close(event) {
    event.preventDefault();
    if (window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'dismiss-donate',
      });
    }
    setHidden(true)
    localStorage.setItem(LS_HIDE_DONATE_KEY, true)
  }

  useEffect(() => {
    if(!localStorage.getItem(LS_HIDE_DONATE_KEY)) {
      const timeout = setTimeout(() => setHidden(false), 5000)
      return function cleanup() {
        clearTimeout(timeout)
      }
    }
  });

  return (
    <DonateBannerWrapper className={hidden ? null : 'show'}>
      <div className="wrapper">
        <DonateButton trackLabel="donate-banner">
          Ti piace MotoViaggiatori? Contribusici con una donazione
        </DonateButton>
        <IconClose onClick={close} />
      </div>
    </DonateBannerWrapper>
  )
}

export default Header
