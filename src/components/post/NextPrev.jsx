import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

import {
  SMALL_SCREEN_ONLY,
  MEDIUM_SCREEN_UP,
  MEDIUM_SCREEN_DOWN,
  LARGE_SCREEN_UP
} from '../../utils/breakpoints';
import {
  ICON_ARROW_LEFT,
  ICON_ARROW_RIGHT
} from '../../utils/icons'
import Flex from '../Flex'

const NextPrevWrapper = styled.nav`
  display: flex;
  justify-content: space-between;

  ${MEDIUM_SCREEN_UP} {
    margin: 0 1rem;
  }

  .label {
    text-transform: uppercase;
  }

  .title {
    font-size: .8em;
  }

  a:hover {
    box-shadow: none;
    text-decoration: underline;
  }

  .previous,
  .next {
    position: relative;

    ${SMALL_SCREEN_ONLY} {
      font-size: .9rem;
    }
    ${MEDIUM_SCREEN_DOWN} {
      max-width: 49%;
    }
    ${LARGE_SCREEN_UP} {
      max-width: 40%;
    }

    &::before,
    &::after {
      position: absolute;
      top: 0;
    }
  }

  .previous {
    padding-left: 1rem;

    &::before {
      left: 0;
      content: "${ICON_ARROW_LEFT}";
    }
  }

  .next {
    padding-right: 1rem;
    text-align: right;

    &::after {
      right: 0;
      content: "${ICON_ARROW_RIGHT}";
    }
  }
`

const RelatedPost = ({ post, label, ...otherProps }) => {
  if (!post) {
    return null;
  }
  const { title, slug } = post.frontmatter;
  return (
    <Link to={slug} {...otherProps}>
      <div className="label">{ label }</div>
      <div className="title">{ title }</div>
    </Link>
  )
}

export default ({ next, previous }) => (
  <NextPrevWrapper>
    <RelatedPost
      label="Post precedente"
      className="previous"
      post={ previous }
    />
    <Flex />
    <RelatedPost
      label="Prossimo post"
      className="next"
      post={ next }
    />
  </NextPrevWrapper>
)