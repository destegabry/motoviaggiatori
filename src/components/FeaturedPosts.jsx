import React from 'react'
import styled from '@emotion/styled';

import useAllFeaturedPosts from '../hooks/use-all-featured-posts'
import { IconArrowRight } from './Icons'
import Link from './Link';
import { altFontStack } from '../utils/theme'
import {
  SMALL_SCREEN_ONLY,
  MEDIUM_SCREEN_ONLY,
  LARGE_SCREEN_UP,
  MEDIUM_SCREEN_UP,
} from '../utils/breakpoints';

const Wrapper = styled.div`
  display: flex;
  margin: 0 -.5rem;

  ${ SMALL_SCREEN_ONLY } {
    flex-direction: column;
  }
  ${ MEDIUM_SCREEN_UP } {
    flex-flow: row wrap;
  }
`;
const Featured = styled.div`
  padding: 0 .5rem;

  ${ MEDIUM_SCREEN_ONLY } {
    flex: 1 1 50%;
  }
  ${ LARGE_SCREEN_UP } {
    flex: 1 1 33.33%;
  }

  a {
    font-family: ${altFontStack.map(name => `"${name}"`).join(', ')};
    font-weight: 600;
    text-transform: uppercase;
  }

  p {
    font-size: .8rem;
  }
`;

const FeaturedPosts = (props) => {
  const posts = useAllFeaturedPosts().map(({node}) => node.frontmatter);

  return (
    <Wrapper
      {...props}
    >
      {
        posts.map(({slug, title, excerpt}, index) => (
          <Featured key={index}>
            <Link to={slug} icon={<IconArrowRight />}>
              { title }
            </Link>
            <p>{ excerpt }</p>
          </Featured>
        ))
      }
    </Wrapper>
  );
}

export default FeaturedPosts;