import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../../utils/theme';
import Container from './Container';
import Footer from './Footer';
import GlobalStyles from './GlobalStyles';
import Header from './Header';

type LayoutProps = {
  children: React.ReactNode | React.ReactNode[];
};

export default function Layout(props: LayoutProps): JSX.Element {
  const { children } = props;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <main>
        <Container>{children}</Container>
      </main>
      <Footer />
    </ThemeProvider>
  );
}
