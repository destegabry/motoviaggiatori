import { keyframes } from '@emotion/react';

const spin = keyframes`
  0% {
    transform: rotate(0deg)
  }

  to {
    transform: rotate(1turn)
  }
`;

export const transitions = {
  keyframes: { spin },
  duration: {
    standard: 300,
    spin: 1200,
  },
};
