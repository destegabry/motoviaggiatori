import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import showdown from 'showdown'
import styled from '@emotion/styled'

import getAuthorUrl from '../utils/getAuthorUrl';
import ResponsiveFlexBox from '../components/ResponsiveFlexBox'
import {
  SMALL_SCREEN_ONLY,
  MEDIUM_SCREEN_UP
} from '../utils/breakpoints'

const converter = new showdown.Converter();

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
  return (
    <ResponsiveFlexBox className="content">
      { !author.acf || !author.acf.avatar ? null :
        <ImgWrapper>
          <Img
            fluid={author.acf.avatar.localFile.childImageSharp.fluid}
            alt={author.acf.avatar.localFile.childImageSharp.alt_text}
          />
        </ImgWrapper>
      }
      <div>
        <h1 dangerouslySetInnerHTML={{ __html: author.name }} />
        <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(author.description) }} />
        { !author.url ? null :
          <p>
            <a
              href={author.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              { author.url }
            </a>
          </p>
        }
        { !showProfileLink || !author.slug ? null :
          <p>
            <Link
              to={getAuthorUrl(author)}
              title={author.name}
            >
              Tutti i post di {author.name}
            </Link>
          </p>
        }
      </div>
    </ResponsiveFlexBox>
  )
}

AuthorBox.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string,
    acf: PropTypes.shape({
      avatar: PropTypes.object,
    }),
    slug: PropTypes.string,
  }).isRequired,
  showProfileLink: PropTypes.bool,
}

export default AuthorBox