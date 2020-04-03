import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled';
import moment from 'moment'
import { Link } from 'gatsby'

import getCategoryUrl from '../../utils/getCategoryUrl';
import getAuthorUrl from '../../utils/getAuthorUrl';
import { altFontStack } from '../../utils/theme';

const Wrapper = styled.div`
  font-size: .7rem;
  font-family: ${altFontStack.join(', ')};

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
      <Wrapper className={className}>
        {!showDate ? null :
          <span itemProp="datePublished" content={post.frontmatter.date}>
            {moment(post.frontmatter.date).format('DD MMM YYYY')}
          </span>
        }
        {!showAuthor ? null : <span>
          <Link to={getAuthorUrl(post.frontmatter.author.frontmatter.slug)}>
            {post.frontmatter.author.frontmatter.name}
          </Link>
        </span>}
        {!showCategories ? null : <span>{post.frontmatter.categories.map(({frontmatter: {slug, name}}, index) => (
          <Link key={index} to={getCategoryUrl(slug)}>
            {name}
          </Link>
        ))}</span>}
        <meta itemProp="image" content={ post.frontmatter.featured_image.publicURL } />
        { !post.frontmatter.modified ? null : <meta itemProp="dateModified" content={ post.frontmatter.modified } /> }
        <meta itemProp="publisher" itemRef="global-org" />
      </Wrapper>
    );
  }
  return null;
}

PostMeta.propTypes = {
  post: PropTypes.object.isRequired,
  showAuthor: PropTypes.bool,
  showDate: PropTypes.bool,
  showCategories: PropTypes.bool
}

PostMeta.defaultProps = {
  showAuthor: true,
  showDate: true,
  showCategories: true,
}

export default PostMeta;