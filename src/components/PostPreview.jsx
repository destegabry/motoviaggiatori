import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { css } from '@emotion/core';
import Img from 'gatsby-image'
import YouTube from 'react-youtube-embed'

import PostMeta from './post/PostMeta'

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
  if (!post.frontmatter.featured_image || !version) {
    return null;
  }
  return (
    <Link
      to={post.frontmatter.slug}
      title={post.frontmatter.title}
      itemProp="url"
    >
      <Img
        fluid={post.frontmatter.featured_image.childImageSharp[version]}
        alt={post.frontmatter.title}
      />
    </Link>
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
  const {frontmatter} = post;

  return (
    <article css={postPreviewStyle} className={className} itemScope itemType="http://schema.org/Article">
      <div className="featured-media">
        { frontmatter.featured_youtube && featuredImage === 'wide' ?
          <YouTube id={ frontmatter.featured_youtube } /> :
          <FeaturedMedia post={post} version={featuredImage} />
        }
      </div>
      <div className="post-info">
        <Link
          to={frontmatter.slug}
          title={frontmatter.title}
        >
          <h3 itemProp="name headline">{frontmatter.title}</h3>
        </Link>
        <PostMeta post={post} showAuthor={showAuthor} showDate={showDate} showCategories={showCategories} />
        { !showExcerpt ? null :
          <div className="excerpt" itemProp="description">
            <p>{frontmatter.excerpt}</p>
          </div>
        }
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
