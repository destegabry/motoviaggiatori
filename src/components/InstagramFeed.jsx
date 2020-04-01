import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import Img from 'gatsby-image/withIEPolyfill'

import {
  SMALL_SCREEN_ONLY,
  MEDIUM_SCREEN_ONLY,
} from '../utils/breakpoints'


function InstagramPost({ post }) {
  return (
    <a
      href={`https://www.instagram.com/p/${post.id}/`}
      title={post.caption}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Img
        fluid={post.localFile.childImageSharp.fluid}
        alt={post.caption}
        />
    </a>
  );
}

const InstagramFeedWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;

  > a {
    display: block;
    flex: 0 0 25%;
    padding: .25rem;
    box-shadow: none;
    transition: opacity .3s;

    &:hover {
      opacity: .8;
    }

    ${SMALL_SCREEN_ONLY} {
      flex-basis: 50%;
    }

    ${MEDIUM_SCREEN_ONLY} {
      flex-basis: 33.3%;
    }
  }
`;

function InstagramFeed({ allInstaNode }) {
  return (
    <InstagramFeedWrapper>
      {allInstaNode.edges.map(({node}) => <InstagramPost key={node.id} post={node} /> )}
    </InstagramFeedWrapper>
  );
}


function InstagramFeedContainer({ limit, size }) {
  return <StaticQuery
    query={ graphql`query {
      allInstaNode(
        sort: {
          fields: [timestamp],
          order: DESC
        }
      ) {
        edges {
          node {
            id
            timestamp
            caption
            localFile {
              childImageSharp {
                fluid(
                  maxWidth: 300,
                  maxHeight: 300,
                  cropFocus: CENTER
                ) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }` }
    render={InstagramFeed}
  />;
}

InstagramFeedContainer.propTypes = {
  limit: PropTypes.number,
};

export default InstagramFeedContainer;