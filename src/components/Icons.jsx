import React from 'react'
import styled from '@emotion/styled'

import {
  ICON_ARROW_LEFT,
  ICON_ARROW_RIGHT,
  ICON_CLOSE
} from '../utils/icons'
import DangerousHTML from './DangerousHTML'

const Icon = styled.span`
  display: inline-block;
  margin: 0 .2rem
`;

export const IconArrowLeft = () => <DangerousHTML component={ Icon } html={ ICON_ARROW_LEFT } />
export const IconArrowRight = () => <DangerousHTML component={ Icon } html={ ICON_ARROW_RIGHT } />
export const IconClose = () => <DangerousHTML component={ Icon } html={ ICON_CLOSE } />