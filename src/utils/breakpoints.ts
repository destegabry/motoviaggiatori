export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const keys: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const values: Record<Breakpoint, number> = { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 };
const ε = 0.05;
const unit = 'px';

const minWidthConstraint = (minWidth: number): string => `(min-width: ${minWidth}${unit})`;
const maxWidthConstraint = (maxWidth: number): string => `(max-width: ${maxWidth - ε}${unit})`;

const createMediaQuery = ({ start, end }: { start?: number; end?: number }): string => {
  const constraints: string[] = [];
  if (start) {
    constraints.push(minWidthConstraint(start));
  }
  if (end) {
    constraints.push(maxWidthConstraint(end));
  }
  return `@media ${constraints.join(' and ')}`;
};

const up = (start: Breakpoint): string => createMediaQuery({ start: values[start] });

const down = (end: Breakpoint): string => createMediaQuery({ end: values[end] });

const between = (start: Breakpoint, end: Breakpoint): string =>
  createMediaQuery({ start: values[start], end: values[end] });

const only = (key: Breakpoint): string => {
  const keyIndex = keys.findIndex((k) => k === key);
  const nextKey = keys[keyIndex + 1];
  return createMediaQuery({ start: values[key], end: values[nextKey] });
};

export const breakpoints = {
  keys,
  values,
  up,
  down,
  between,
  only,
  createMediaQuery,
  minWidthConstraint,
  maxWidthConstraint,
};
