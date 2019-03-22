
import React from 'react'
import { Link } from 'gatsby'

import { useSiteMetadata } from '../../hooks/use-site-metadata'
import Logo from './motoviaggiatori_logo.svg'

export default () => {
  const { name } = useSiteMetadata()

  return (
    <Link className="logo" to="/" title={ name }>
      <Logo />
    </Link>
  )
}
