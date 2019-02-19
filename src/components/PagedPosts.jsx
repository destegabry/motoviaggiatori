import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import {colors} from '../utils/theme';
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
    margin: 2px;
    height: 30px;
    width: 30px;

    &[disabled] {
      opacity: .6;
    }
  }
`;

class PagedPosts extends Component {
  state = { width: 0, page: 0 };

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.updateDimensions = this.updateDimensions.bind(this)
  }

  updateDimensions() {
    this.setState({ width: document.body.clientWidth });
  }

  setPage(page) {
    this.scrollToSectionTop();
    this.setState({ page });
  }

  scrollToSectionTop() {
    window.scrollTo({
      top: this.myRef.current.offsetTop - 100,
      behavior: 'smooth'
    })
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  render() {
    const { posts, pageSize, className } = this.props;
    const { page, width } = this.state;
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
      <section ref={this.myRef} className={className}>
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
            <button onClick={() => this.setPage(page - 1)} disabled={page === 0}>&lt;</button>
            { pages.map((label, index) => <button key={index} onClick={() => this.setPage(index)} disabled={page === index}>{label}</button>) }
            <button onClick={() => this.setPage(page + 1)} disabled={page === totalPages - 1}>&gt;</button>
          </Pagination>
        }
      </section>
    );
  }
}

PagedPosts.propTypes = {
  posts: PropTypes.array.isRequired,
  pageSize: PropTypes.number,
};

PagedPosts.defaultProps = {
  pageSize: 12
};

export default PagedPosts;