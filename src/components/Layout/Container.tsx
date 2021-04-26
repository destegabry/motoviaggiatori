import { Theme } from '@emotion/react';
import styled from '@emotion/styled';

export default styled.div(({ theme }: { theme: Theme }) => ({
  width: '100%',
  maxWidth: theme.container.maxWidth,
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
}));
