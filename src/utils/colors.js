let colors = {
  red: '#c20000',
  pink: '#a3226b',
  green: '#1d6900',
  blue: '#31708f',
  azure: '#d9edf7',
  palette: {
    primary: {
      light: '#fcfcfd',
      main: '#3a4e5f',
      dark: '#24303a',
      contrast: '#fff'
    },
    secondary: {
      light: '#e0fff0',
      main: '#57ffad',
      dark: '#007d80',
      contrast: '#000'
    },
    grey: {
      light: '#d9d9d9',
      main: '#3f3f3f',
      dark: '#191919',
    }
  }
}

colors.text = {
  primary: colors.palette.grey.dark,
  secondary: colors.palette.grey.dark
}

module.exports = colors;