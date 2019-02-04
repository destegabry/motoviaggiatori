export const SMALL_SCREEN_MAX_SIZE = 600;
export const MEDIUM_SCREEN_MAX_SIZE = 900;
export const LARGE_SCREEN_MAX_SIZE = 1200;

export const SMALL_SCREEN_ONLY = `@media only screen and (max-width: ${SMALL_SCREEN_MAX_SIZE}px)`;
export const MEDIUM_SCREEN_ONLY = `@media only screen and (min-width: ${SMALL_SCREEN_MAX_SIZE + 1}px) and (max-width: ${MEDIUM_SCREEN_MAX_SIZE}px)`;
export const LARGE_SCREEN_ONLY = `@media only screen and (min-width: ${MEDIUM_SCREEN_MAX_SIZE + 1}px) and (max-width: ${LARGE_SCREEN_MAX_SIZE}px)`;
export const HUGE_SCREEN_ONLY = `@media only screen and (min-width: ${LARGE_SCREEN_MAX_SIZE + 1}px)`;

export const MEDIUM_SCREEN_UP = `@media only screen and (min-width: ${SMALL_SCREEN_MAX_SIZE + 1}px)`;
export const LARGE_SCREEN_UP = `@media only screen and (min-width: ${MEDIUM_SCREEN_MAX_SIZE + 1}px)`;
export const HUGE_SCREEN_UP = `@media only screen and (min-width: ${LARGE_SCREEN_MAX_SIZE + 1}px)`;

export const MEDIUM_SCREEN_DOWN = `@media only screen and (max-width: ${MEDIUM_SCREEN_MAX_SIZE}px)`;
export const LARGE_SCREEN_DOWN = `@media only screen and (max-width: ${LARGE_SCREEN_MAX_SIZE}px)`;