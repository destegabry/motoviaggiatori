import React from 'react';
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
    <ThemeProvider theme={theme}>
      <SEO {...seoProps} />
      <GlobalStyles />
      <Header />
      <main itemScope itemType="https://schema.org/Blog">
        <Container>{children}</Container>
      </main>
      <Footer />
    </ThemeProvider>
  );
}
