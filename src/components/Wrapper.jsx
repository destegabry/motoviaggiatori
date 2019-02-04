import styled from '@emotion/styled'
import { MEDIUM_SCREEN_DOWN } from '../utils/breakpoints'

export default styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 10px;
  width: 90%;
  max-width: 1280px;

  ${MEDIUM_SCREEN_DOWN} {
    width: 100%
  }
`