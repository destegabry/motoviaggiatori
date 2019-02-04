import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled';
import moment from 'moment'
import AuthorLink from './AuthorLink'
import CategoryLink from './CategoryLink'

const Wrapper = styled.div`
  font-size: .7rem;

  span + span::before {
    content: ' | ';
  }

  span {
    a:not(:last-child)::after {
      content: ', '
    }
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
      <StaticQuery
        query={graphql`
          query categoryLinkQuery {
            allWordpressCategory {
              edges {
                node {
                  id
                  name
                  slug
                  parent_element {
                    id
                  }
                }
              }
            }
          }
        `}
        render={({allWordpressCategory}) => (
          <Wrapper className={className}>
            {!showDate ? null : <span>{moment(post.date).format('DD MMM YYYY')}</span>}
            {!showAuthor ? null : <span><AuthorLink author={post.author} /></span>}
            {!showCategories ? null : <span>{post.categories.map(category => (
              <CategoryLink
                key={category.slug}
                category={category}
                categories={allWordpressCategory.edges}
              />
            ))}</span>}
          </Wrapper>
        )}
      />
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