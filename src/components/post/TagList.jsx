import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

import { palette } from '../../utils/colors'
import Card from '../Card'

const TagSection = styled.section`
  a {
    display: inline-block;
    padding: .25rem 1rem;
    background: ${palette.grey.light};
    border-radius: 1.5rem;
    margin-bottom: .25rem;
    margin-left: .25rem;
  }
`

const Tag = ({ slug, name }) => (
  <Link to={`/${slug}`}>
    {name}
  </Link>
)

export default ({ tags, ...otherProps }) => {
  if (!tags || tags.length === 0) {
    return null;
  }
  return (
    <Card {...otherProps}>
      <TagSection>
        <h3>Tags</h3>
        { tags.map(({ frontmatter }) => <Tag key={ frontmatter.slug } { ...frontmatter } />) }
      </TagSection>
    </Card>
  )
}