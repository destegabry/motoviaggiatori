const fontFamilySerif = ['Crimson Pro', 'serif'].join(', ');
const fontFamilySansSerif = ['Commissioner', 'sans-serif'].join(', ');

const fontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
};

export const typography = {
  fontSize: 24,
  lineHeight: 1.5,
  fontFamily: fontFamilySansSerif,
  fontWeight,
  h1: {
    fontSize: '2.25rem',
    fontWeight: fontWeight.regular,
    lineHeight: 1.15,
    marginBlockStart: 0,
    marginBlockEnd: '.6em',
  },
  h2: {
    fontSize: '1.75rem',
    fontWeight: fontWeight.regular,
    lineHeight: 1.2,
    marginBlockStart: '.75em',
    marginBlockEnd: '.75em',
  },
  h3: {
    fontSize: '1.25rem',
    fontWeight: fontWeight.medium,
    lineHeight: 1.2,
    marginBlockStart: '.8em',
    marginBlockEnd: '.8em',
  },
  h4: {
    fontSize: '1.15rem',
    fontWeight: fontWeight.medium,
    lineHeight: 1.25,
    marginBlockStart: '.8em',
    marginBlockEnd: '.8em',
  },
  h5: {
    fontSize: '1.1rem',
    fontWeight: fontWeight.bold,
    lineHeight: 1.4,
    marginBlockStart: '1em',
    marginBlockEnd: '1em',
  },
  h6: {
    fontSize: '1rem',
    fontWeight: fontWeight.bold,
    lineHeight: 1.5,
    marginBlockStart: '1em',
    marginBlockEnd: '1em',
  },
  body: {
    fontFamily: fontFamilySerif,
    fontWeight: fontWeight.regular,
    lineHeight: 1.5,
    fontSize: '1rem',
    marginBlockStart: '1em',
    marginBlockEnd: '1em',
  },
  caption: {
    fontFamily: fontFamilySansSerif,
    fontWeight: fontWeight.regular,
    lineHeight: 1,
    fontSize: '.8rem',
    marginBlockStart: 0,
    marginBlockEnd: 0,
  },
};
