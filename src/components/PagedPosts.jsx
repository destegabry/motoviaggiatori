import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import {colors} from '../utils/theme';
import {
  IconArrowLeft,
  IconArrowRight,
} from '../components/Icons'
import Card from './Card'
import PostPreviewFull from './PostPreviewFull'

import {
  SMALL_SCREEN_MAX_SIZE,
  LARGE_SCREEN_MAX_SIZE,
  SMALL_SCREEN_ONLY
} from '../utils/breakpoints'

const PagedPostsWrapper = styled.div`
  display: flex;

  > div {
    flex: 0 1 50%;

    ${SMALL_SCREEN_ONLY} {
      flex: 0 0 100%;

      > div {
        margin-left: 0;
        margin-right: 0;
      }
    }
  }

`;

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
  const [width, setWidth] = useState(0);
  const [page, setPage] = useState(0);

  function updateDimensions() {
    setWidth(document.body.clientWidth)
  }

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  });

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

  let columns;

  if (width <= SMALL_SCREEN_MAX_SIZE) {
    columns = 1;
  } else if (width <= LARGE_SCREEN_MAX_SIZE) {
    columns = 2;
  } else {
    columns = 3;
  }

  const totalPages = Math.ceil(posts.length / pageSize);
  const pages = [];
  for(let index = 0; index < totalPages; index++) {
    pages.push(index + 1);
  }

  const groupedPosts = posts.slice(page * pageSize, page * pageSize + pageSize).reduce((groupedPosts, node, index) => {
    const post = node.post || node;
    const column = index % columns;
    groupedPosts[column] = groupedPosts[column] || [];
    groupedPosts[column].push(post);
    return groupedPosts;
  }, []);

  return (
    <section ref={ref} className={className}>
      <PagedPostsWrapper>
        {
          groupedPosts.map((column, index) => (
            <div key={index}>
              {
                column.map((post, index) => (
                  <Card key={index}>
                    <PostPreviewFull post={post.node || post} />
                  </Card>
                ))
              }
            </div>
          ))
        }
      </PagedPostsWrapper>
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