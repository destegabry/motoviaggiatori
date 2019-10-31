import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'
import styled from '@emotion/styled'
import { css } from '@emotion/core'

import getAuthorUrl from '../utils/getAuthorUrl'
import { palette } from '../utils/colors'
import {
  SMALL_SCREEN_ONLY,
  MEDIUM_SCREEN_UP
} from '../utils/breakpoints'
import ResponsiveFlexBox from './ResponsiveFlexBox'
import {
  Instagram,
  Facebook,
  Website,
  Youtube
} from '../components/SocialLinks'
import DangerousHTML from '../components/DangerousHTML'
import Card from './Card'

const ImgWrapper = styled.div`
  ${SMALL_SCREEN_ONLY} {
    margin-bottom: 1rem;
  }

  ${MEDIUM_SCREEN_UP} {
    flex: 0 0 300px;
    margin-right: 1rem;
  }
`;

const LinkWrapper = styled.div`
  margin-bottom: .5rem;

  a:hover {
    box-shadow: none;
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
    <Card itemScope="itemscope" itemType="http://schema.org/Person" {...otherProps}>
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
            <p>
              <Link to={ getAuthorUrl(slug) }>
                Tutti i post di {name}
              </Link>
            </p>
          }
        </div>
      </ResponsiveFlexBox>
    </Card>
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