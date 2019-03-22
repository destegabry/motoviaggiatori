// colors: {
//   cello: '#3a4e5f',
//   accent: '#6bfda7',
//   blue: '#00a8ff',
//   green: '#8bd623',
//   white: '#fff',
// }
let colors = {
  palette: {
    primary: {
      light: '#ecf0f5',
      main: '#3a4e5f',
      dark: '#24303a',
      contrast: '#fff'
    },
    secondary: {
      light: '#e0fff0',
      main: '#57ffad',
      dark: '#006163',
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