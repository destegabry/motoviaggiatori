import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image/withIEPolyfill'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

import getAuthorUrl from '../utils/getAuthorUrl'
import { palette } from '../utils/colors'
import {
  VERY_SMALL_SCREEN_ONLY,
  SMALL_SCREEN_ONLY,
  SMALL_SCREEN_UP
} from '../utils/breakpoints'
import {
  Instagram,
  Facebook,
  Website,
  Youtube
} from '../components/SocialLinks'
import Link from '../components/Link'
import DangerousHTML from '../components/DangerousHTML'
import { IconArrowRight } from './Icons'

const ContentWrapper = styled.div`
  display: flex;

  ${VERY_SMALL_SCREEN_ONLY} {
    flex-direction: column;
  }
`;

const ImgWrapper = styled.div`
  ${VERY_SMALL_SCREEN_ONLY} {
    margin-bottom: 1rem;
  }

  ${SMALL_SCREEN_UP} {
    flex: 0 1 300px;
    margin-right: 1rem;
  }

  ${SMALL_SCREEN_ONLY} {
    flex: 0 1 200px;
  }
`;

const TextWrapper = styled.div`
flex: 1 0 0%;`;

const LinkWrapper = styled.div`
  margin-bottom: .25rem;

  a {
    display: flex;
    align-items: center;

    &:hover {
      box-shadow: none;
    }
  }
`;

const socialIcon = css`
  width: 1rem;
  margin-right: .5rem;
  fill: ${palette.secondary.dark};
`;


function AuthorBox({ author, showProfileLink, ...otherProps }) {
  const {
    name,
    slug,
    avatar,
    website,
    instagram,
    facebook,
    youtube
  } = author.frontmatter;

  return (
    <ContentWrapper className="content" itemScope="itemscope" itemType="http://schema.org/Person" {...otherProps}>
      { !avatar ? null :
        <ImgWrapper className="image-wrapper">
          <Img
            fluid={avatar.childImageSharp.fluid}
            alt={avatar.childImageSharp.alt_text}
          />
        </ImgWrapper>
      }
      <TextWrapper className="text-wrapper">
        <h1>{ name }</h1>
        <DangerousHTML html={ author.html } />
        { !website ? null :
          <LinkWrapper>
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              title="Sito web"
            >
              <Website css={socialIcon} />
              { website }
            </a>
          </LinkWrapper>
        }
        { !facebook?.url ? null :
          <LinkWrapper>
            <a
              href={facebook.url}
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
            >
              <Facebook css={socialIcon} />
              { facebook.name }
            </a>
          </LinkWrapper>
        }
        { !instagram?.url ? null :
          <LinkWrapper>
            <a
              href={instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
            >
              <Instagram css={socialIcon} />
              { instagram.name }
            </a>
          </LinkWrapper>
        }
        { !youtube?.url ? null :
          <LinkWrapper>
            <a
              href={youtube.url}
              target="_blank"
              rel="noopener noreferrer"
              title="YouTube"
            >
              <Youtube css={socialIcon} />
              { youtube.name }
            </a>
          </LinkWrapper>
        }
        { !showProfileLink || !slug ? null :
          <div>
            <Link to={getAuthorUrl(slug)} icon={<IconArrowRight />}>
              Tutti i post di {name}
            </Link>
          </div>
        }
      </TextWrapper>
    </ContentWrapper>
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