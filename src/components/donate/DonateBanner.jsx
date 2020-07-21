import React, {useState} from 'react'
import styled from '@emotion/styled'

import DonateButton from './DonateButton'
import Flex from '../Flex'
import { palette } from '../../utils/colors'
import { altFontStack } from '../../utils/theme'
import { IconClose } from '../Icons'

const bannerHeight = '1.5rem';
const LS_HIDE_DONATE_KEY = 'hideDonate';


const DonateBannerWrapper = styled.div`
  background: ${palette.secondary.main};
  z-index: 1;
  height: 0;
  transition: height .5s;

  &.show {
    height: ${bannerHeight};
  }

  .wrapper {
    display: flex;
    align-items: center;
  }

  button {
    background: transparent;
    border: 0;
    outline: 0;
    cursor: pointer;
    height: ${bannerHeight};
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
  const [hidden, setHidden] = useState(Boolean(localStorage.getItem(LS_HIDE_DONATE_KEY)))

  function close(event) {
    event.preventDefault();
    setHidden(true)
    localStorage.setItem(LS_HIDE_DONATE_KEY, true)
  }

  return (
    <DonateBannerWrapper className={hidden ? null : 'show'}>
      <div className="wrapper">
        <DonateButton trackLabel="header-banner">
          <span>Ti piace MotoViaggiatori? Contribusici con una donazione</span>
        </DonateButton>
        <Flex />
        <IconClose onClick={close} />
      </div>
    </DonateBannerWrapper>
  )
}

export default Header
