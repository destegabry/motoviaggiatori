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

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <main
        itemScope
        itemType="https://schema.org/Blog"
        css={(theme) => ({ marginTop: theme.spacing(4), marginBottom: theme.spacing(4) })}
      >
        <Container>{children}</Container>
      </main>
      <Footer />
    </ThemeProvider>
  );
}
