import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from '@emotion/styled'

import getAuthorUrl from '../utils/getAuthorUrl';
import ResponsiveFlexBox from '../components/ResponsiveFlexBox'
import {
  SMALL_SCREEN_ONLY,
  MEDIUM_SCREEN_UP
} from '../utils/breakpoints'

const ImgWrapper = styled.div`
  ${SMALL_SCREEN_ONLY} {
    margin-bottom: 1rem;
  }

  ${MEDIUM_SCREEN_UP} {
    flex: 0 0 300px;
    margin-right: 1rem;
  }
`;


function AuthorBox({ author, showProfileLink }) {
  const {
    name,
    slug,
    avatar,
    website
  } = author.frontmatter;

  return (
    <ResponsiveFlexBox className="content">
      { !avatar ? null :
        <ImgWrapper>
          <Img
            fluid={avatar.childImageSharp.fluid}
            alt={avatar.childImageSharp.alt_text}
          />
        </ImgWrapper>
      }
      <div>
        <h1>{ name }</h1>
        <div dangerouslySetInnerHTML={{ __html: author.html }} />
        { !website ? null :
          <p>
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
            >
              { website }
            </a>
          </p>
        }
        { !showProfileLink || !slug ? null :
          <p>
            <Link
              to={getAuthorUrl(slug)}
              title={name}
            >
              Tutti i post di {name}
            </Link>
          </p>
        }
      </div>
    </ResponsiveFlexBox>
  )
}

AuthorBox.propTypes = {
  author: PropTypes.shape({
    html: PropTypes.string,
    frontmatter: PropTypes.shape({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string,
      website: PropTypes.string,
      avatar: PropTypes.object,
    }).isRequired,
  }).isRequired,
  showProfileLink: PropTypes.bool,
}

export default AuthorBox