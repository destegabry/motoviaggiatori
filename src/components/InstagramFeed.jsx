import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

function InstagramPost({ post }) {
  return (
    <a
      href={`https://www.instagram.com/p/${post.id}`}
      title={post.caption}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Img
        fixed={post.localFile.childImageSharp.fixed}
        alt={post.caption}
      />
    </a>
  );
}

function InstagramFeed({ allInstaNode }) {
  return (
    <div>
      {allInstaNode.edges.map(({node}) => <InstagramPost key={node.id} post={node} /> )}
    </div>
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
        limit: 4
      ) {
        edges {
          node {
            id
            mediaType
            timestamp
            caption
            localFile {
              childImageSharp {
                fixed(width: 150, height: 150) {
                  ...GatsbyImageSharpFixed
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