import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { css } from '@emotion/core';
import Img from 'gatsby-image'

import getPostUrl from '../utils/getPostUrl'
import PostMeta from './PostMeta'

const postPreviewStyle = css`
  padding: 10px;
  font-size: 1rem;

  h3 {
    font-size: 1em;
    margin: 0;
  }

  .post-meta {
    font-size: .7rem;

    span + span::before {
      content: ' | ';
    }
  }
`;


const FeaturedMedia = ({post, version}) => {
  if (!post['featured_media'] || !version) {
    return null;
  }
  return (
    <Img
      fluid={post['featured_media'].localFile.childImageSharp[version]}
      alt={post['featured_media']['alt_text']}
    />
  );
};

const PostPreview = props => {
  const {
    showExcerpt,
    featuredImage,
    className,
    showAuthor,
    showDate,
    showCategories
  } = props;

  const post = props.post.node || props.post;

  return (
    <article css={postPreviewStyle} className={className} itemScope itemType="http://schema.org/Article">
      <div className="featured-media">
        <Link
          to={getPostUrl(post)}
          title={post.title}
          itemProp="url"
        >
          <FeaturedMedia post={post} version={featuredImage} />
        </Link>
      </div>
      <div className="post-info">
        <Link
          to={getPostUrl(post)}
          title={post.title}
        >
          <h3 dangerouslySetInnerHTML={{ __html: post.title }} itemProp="name headline" />
        </Link>
        <PostMeta post={post} showAuthor={showAuthor} showDate={showDate} showCategories={showCategories} />
        { !showExcerpt ? null : <div className="excerpt" itemProp="description" dangerouslySetInnerHTML={{ __html: post.excerpt }} /> }
      </div>
    </article>
  )
}

PostPreview.propTypes = {
  post: PropTypes.object.isRequired,
  featuredImage: PropTypes.string,
  showExcerpt: PropTypes.bool,
  showAuthor: PropTypes.bool,
  showDate: PropTypes.bool,
  showCategories: PropTypes.bool,
  style: PropTypes.object,
}

PostPreview.defaultProps = {
  showExcerpt: true,
  showAuthor: true,
  showDate: true,
  showCategories: true,
}

export default PostPreview;
