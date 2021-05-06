export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const keys: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const values: Record<Breakpoint, number> = { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 };
const ε = 0.05;
const unit = 'px';

const createMediaQuery = ({ start, end }: { start?: Breakpoint; end?: Breakpoint }): string => {
  const constraints: string[] = [];
  if (start) {
    constraints.push(`(min-width: ${values[start]}${unit})`);
  }
  if (end) {
    constraints.push(`(max-width: ${values[end] - ε}${unit})`);
  }
  return `@media ${constraints.join(' and ')}`;
};

const up = (start: Breakpoint): string => createMediaQuery({ start });

const down = (end: Breakpoint): string => createMediaQuery({ end });

const between = (start: Breakpoint, end: Breakpoint): string => createMediaQuery({ start, end });

const only = (key: Breakpoint): string => {
  const keyIndex = keys.findIndex((k) => k === key);
  const nextKey = keys[keyIndex + 1];
  return createMediaQuery({ start: key, end: nextKey });
};

export const breakpoints = {
  keys,
  values,
  up,
  down,
  between,
  only,
};
