import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSiteMetadata } from '../../hooks/useSiteMetadata';

type SEOProps = {
  title?: string;
  description?: string;
  image?: string;
  children?: React.ReactNode | React.ReactNode[];
};

export default function SEO(props: SEOProps): JSX.Element {
  const { children } = props;
  const siteMetadata = useSiteMetadata();

  const title = props.title
    ? `${props.title} | ${siteMetadata.title}`
    : `${siteMetadata.title} | ${siteMetadata.description}`;
  const description = props.description || siteMetadata.description;
  const image = props.image
    ? `${props.image}?nf_resize=smartcrop&w=600&h=315`
    : `/static/icons/motoviaggiatori_opengraph.png`;

  const meta = [
    { property: `description`, content: description },
    { property: `og:title`, content: title },
    { property: `og:description`, content: description },
    { property: `og:type`, content: `website` },
    { property: `og:image`, content: `${siteMetadata.siteUrl}${image}` },
    { property: `og:image:width`, content: `600` },
    { property: `og:image:height`, content: `315` },
    { property: `fb:app_id`, content: process.env.GATSBY_FB_APP_ID },
    { property: `twitter:card`, content: `summary` },
    { property: `twitter:title`, content: title },
    { property: `twitter:description`, content: description },
  ];
  return (
    <Helmet htmlAttributes={{ lang: siteMetadata.language }} title={title} meta={meta}>
      {children}
    </Helmet>
  );
}
