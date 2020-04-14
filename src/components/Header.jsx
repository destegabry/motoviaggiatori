import React, { useState } from 'react'
import { useInView } from 'react-intersection-observer'

import Logo from './Logo'
import MainMenu from './MainMenu'
import SocialLinks from './SocialLinks'
import Flex from './Flex'
import {
  IconHamburger,
  IconClose,
  IconArrowToTop
} from './Icons'

const scrollTop = event => {
  event.preventDefault();
  document.getElementById('header-menu').scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    document.querySelector('body').classList.toggle('modal-open', !mobileMenuOpen);
    document.querySelector('html').classList.toggle('modal-open', !mobileMenuOpen);
    setMobileMenuOpen(!mobileMenuOpen);
  }

  const [ref, inView] = useInView({
    threshold: 0
  });

  return (
    <header
      id="header-menu"
      className={ [
        inView ? '' : 'sticky ',
        mobileMenuOpen ? 'mobile-menu-open' : ''
      ].join(' ') }
    >
      <div className="header-wrapper">
        <div className="nav-wrapper">
          <Logo />
          <Flex />
          <MainMenu />
          <SocialLinks size={24} hideMail iconStyle={{ marginRight: 12 }} />
          <div
            className="mobile-menu-opener"
            onClick={ () => toggleMobileMenu() }
          >
            { mobileMenuOpen ? <IconClose /> : <IconHamburger />}
          </div>
        </div>
      </div>
      <div className="in-view-ref" ref={ref} />
      <span className="back-to-top" onClick={scrollTop}>
        <IconArrowToTop />
      </span>
    </header>
  )
}

export default Header
