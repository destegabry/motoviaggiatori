import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import {colors} from '../utils/theme';
import {
  IconArrowLeft,
  IconArrowRight,
} from '../components/Icons'
import Columns from '../components/Columns'
import PostPreviewFull from './PostPreviewFull'

import {
  SMALL_SCREEN_MAX_SIZE,
  LARGE_SCREEN_MAX_SIZE,
  MEDIUM_SCREEN_MAX_SIZE,
} from '../utils/breakpoints'

const Pagination = styled.nav`
  text-align: center;

  button {
    background: ${colors.palette.primary.main};
    border: 0;
    border-radius: 3px;
    color: ${colors.palette.primary.contrast};
    cursor: pointer;
    font-size: .9rem;
    margin: 2px;
    padding: 0;
    line-height: 30px;
    height: 30px;
    width: 30px;
    vertical-align: middle;
    text-align: center;

    &[disabled] {
      opacity: .6;
    }

    svg {
      display: block;
      margin: auto;
      fill: ${colors.palette.primary.contrast};
      height: .8rem;
      width: .8rem;
    }
  }
`;

const ref = React.createRef();

function PagedPosts (props) {
  const [page, setPage] = useState(0);

  function scrollToSectionTop() {
    window.scrollTo({
      top: ref.current.offsetTop - 100,
      behavior: 'smooth'
    })
  }

  function changePage(page) {
    scrollToSectionTop();
    setPage(page);
  }


  const { posts, pageSize, className } = props;

  const totalPages = Math.ceil(posts.length / pageSize);
  const pages = [];
  for(let index = 0; index < totalPages; index++) {
    pages.push(index + 1);
  }

  const pagedPosts = posts.slice(page * pageSize, page * pageSize + pageSize);

  return (
    <section ref={ref} className={className}>
      <Columns
        items={
          pagedPosts.map((post, index) => (
            <PostPreviewFull key={index} post={post.node || post} />
          ))
        }
        breakpoints={[
          SMALL_SCREEN_MAX_SIZE,
          MEDIUM_SCREEN_MAX_SIZE,
        ]}
      />
      { totalPages === 1 ? null :
        <Pagination>
          <button
            onClick={() => changePage(page - 1)}
            disabled={page === 0}
          >
            <IconArrowLeft />
          </button>
          { pages.map((label, index) => (
            <button
              key={index}
              onClick={() => changePage(index)}
              disabled={page === index}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => changePage(page + 1)}
            disabled={page === totalPages - 1}
            >
            <IconArrowRight />
          </button>
        </Pagination>
      }
    </section>
  );
}

PagedPosts.propTypes = {
  posts: PropTypes.array.isRequired,
  pageSize: PropTypes.number,
};

PagedPosts.defaultProps = {
  pageSize: 12
};

export default PagedPosts;