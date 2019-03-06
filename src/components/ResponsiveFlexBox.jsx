import styled from '@emotion/styled'
import { SMALL_SCREEN_ONLY } from '../utils/breakpoints'

const ResponsiveFlexBox = styled.div`
display: flex;

${SMALL_SCREEN_ONLY} {
  flex-direction: column;
}
`;

export default ResponsiveFlexBox;