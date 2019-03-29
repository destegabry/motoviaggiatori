import React from 'react'
import styled from '@emotion/styled'

import {
  ICON_ARROW_LEFT,
  ICON_ARROW_RIGHT,
  ICON_CLOSE
} from '../utils/icons'

const Icon = styled.span`
  display: inline-block;
  margin: 0 .2rem
`;

export const IconArrowLeft = () => <Icon dangerouslySetInnerHTML={{__html: ICON_ARROW_LEFT}} />
export const IconArrowRight = () => <Icon dangerouslySetInnerHTML={{__html: ICON_ARROW_RIGHT}} />
export const IconClose = () => <Icon dangerouslySetInnerHTML={{__html: ICON_CLOSE}} />