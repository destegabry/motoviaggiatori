import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled';
import moment from 'moment'
import AuthorLink from './AuthorLink'

const Wrapper = styled.div`
  font-size: .7rem;

  span + span::before {
    content: ' | ';
  }
`;

const PostMeta = props => {
  const {
    showAuthor,
    showDate,
    showCategories,
    className
  } = props;

  const post = props.post.node || props.post;

  if (showAuthor || showDate || showCategories) {
    return (
      <Wrapper className={className}>
        {!showDate ? null : <span>{moment(post.date).format('DD MMM YYYY')}</span>}
        {!showAuthor ? null : <span><AuthorLink author={post.author} /></span>}
        {!showCategories ? null : <span>{post.categories.map(({name}) => name).join(', ')}</span>}
      </Wrapper>
    );
  }
  return null;
}

PostMeta.propTypes = {
  post: PropTypes.object.isRequired,
  showExcerpt: PropTypes.bool,
  showAuthor: PropTypes.bool,
  showDate: PropTypes.bool,
  showCategories: PropTypes.bool
}

PostMeta.defaultProps = {
  showExcerpt: true,
  showAuthor: true,
  showDate: true,
  showCategories: true,
}

export default PostMeta;