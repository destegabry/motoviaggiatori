import { useCallback, useRef } from 'react';

type UseLockPageScroll = {
  isPageScrollLocked: () => boolean;
  lockPageScroll: () => void;
  unlockPageScroll: () => void;
};

export function useLockPageScroll(): UseLockPageScroll {
  const bodyElement = useRef(document.querySelector('body'));

  const isPageScrollLocked = useCallback(() => bodyElement.current?.classList.contains('locked') || false, []);

  const lockPageScroll = useCallback(() => bodyElement.current?.classList.add('locked'), []);

  const unlockPageScroll = useCallback(() => bodyElement.current?.classList.remove('locked'), []);

  return {
    isPageScrollLocked,
    lockPageScroll,
    unlockPageScroll,
  };
}
