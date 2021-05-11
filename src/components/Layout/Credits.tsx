import React from 'react';
import { Link } from 'gatsby';
import { useSiteMetadata } from '../../hooks/useSiteMetadata';
import Container from './Container';

export default function Credits(): JSX.Element {
  const { name, repositoryUrl, version } = useSiteMetadata();

  return (
    <Container
      css={(theme) => ({
        fontSize: theme.typography.caption.fontSize,
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        textAlign: 'center',
      })}
    >
      <span>©{new Date().getFullYear()}</span>
      &nbsp;
      <span itemProp="name">{name}</span>
      &nbsp;/&nbsp;
      <a href={repositoryUrl} target="_blank" rel="noopener noreferrer">
        v{version}
      </a>
      <span
        css={(theme) => ({
          [theme.breakpoints.down('md')]: {
            display: 'block',
            height: 0,
            visibility: 'hidden',
          },
        })}
      >
        &nbsp;/&nbsp;
      </span>
      Powered by&nbsp;
      <a href="https://www.topsolution.it" target="_blank" rel="noopener noreferrer">
        Top Solution
      </a>
      &nbsp;/&nbsp;
      <Link to="/privacy-policy">Privacy policy</Link>
    </Container>
  );
}
