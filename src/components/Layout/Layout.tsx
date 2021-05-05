import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../../utils/theme';
import Container from './Container';
import Footer from './Footer';
import GlobalStyles from './GlobalStyles';
import Header from './Header';
import SEO from './SEO';

type LayoutProps = {
  children: React.ReactNode | React.ReactNode[];
  title?: string;
  description?: string;
  image?: string;
};

export default function Layout(props: LayoutProps): JSX.Element {
  const { children, ...seoProps } = props;
  return (
    <HelmetProvider>
      <SEO {...seoProps} />
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header />
        <main
          itemScope
          itemType="https://schema.org/Blog"
          css={(theme) => ({
            minHeight: `calc(70vh - ${theme.components.header.height}px)`,
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(4),
          })}
        >
          <Container>{children}</Container>
        </main>
        <Footer />
      </ThemeProvider>
    </HelmetProvider>
  );
}
