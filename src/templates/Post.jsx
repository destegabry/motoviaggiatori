import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'

import {
  SMALL_SCREEN_ONLY,
  MEDIUM_SCREEN_UP,
  SMALL_SCREEN_MAX_SIZE,
} from '../utils/breakpoints';
import Gallery from '../utils/Gallery';
import AuthorBox from '../components/AuthorBox'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import Card from '../components/Card'
import DangerousHTML from '../components/DangerousHTML'
import {
  PostMeta,
  Vote,
  Article,
  TagList,
  NextPrev,
  FeaturedMedia,
  AttributesTable,
  FacebookButtons
} from '../components/post'
import Banner from '../components/Banner';

const cardCss = css`
  ${SMALL_SCREEN_ONLY} {
    padding: 1rem;
  }

  ${MEDIUM_SCREEN_UP} {
    padding: 1rem 2rem;
  }
`

const postMetaStyle = css`
  margin-bottom: 2rem;
  text-align: center;
  font-size: .9rem;
`

function PostTemplate (props) {
  useEffect(() => {
    // let galleries = [];
    let epn;
    // Adding EPN script after page render will trigger link replacement
    window._epn = {campaign: process.env.GATSBY_EPN_CAMPAIGN_ID};
    epn = document.createElement('script');
    epn.id = 'epn';
    epn.setAttribute('src', 'https://epnt.ebay.com/static/epn-smart-tools.js');
    document.querySelector('body').appendChild(epn);

    // const rowRatio = document.documentElement.clientWidth <= SMALL_SCREEN_MAX_SIZE ? 3 : 5;
    // const rawFigures = document.querySelectorAll('.gatsby-resp-image-figure');
    // const adjacentFiguresGroups = [];
    // if (rawFigures.length > 0) {
    //   // good old for-loop as querySelectorAll doesn't return an iterable :,(
    //   for (let i = 0, galleryWrapper; i < rawFigures.length; i++) {
    //     const figure = rawFigures[i];
    //     if (!figure.previousElementSibling || figure.previousElementSibling.className !== 'gallery-wrapper') {
    //       galleryWrapper = document.createElement('div');
    //       galleryWrapper.className = 'gallery-wrapper';
    //       figure.parentElement.insertBefore(galleryWrapper, figure);
    //       adjacentFiguresGroups.push(galleryWrapper);
    //     }
    //     galleryWrapper.appendChild(figure);
    //   }
    //   galleries = adjacentFiguresGroups.map(gallery => new Gallery(gallery, rowRatio));
    // }

    return () => {
      // Remove galleries listeners
      // galleries.forEach(gallery => gallery.destroy());
      // Remove EPN script
      epn.remove();
      document.querySelectorAll('img[src^="https://rover.ebay.com"]').forEach(node => node.remove())
    };
  });

  const currentPost = props.data.markdownRemark;
  const { frontmatter } = currentPost;
  let disclaimers = currentPost.frontmatter.categories.reduce((disclaimers, {frontmatter}) => {
    if(frontmatter.disclaimer) {
      disclaimers.push(frontmatter.disclaimer);
    }
    return disclaimers;
  }, []);

  if (frontmatter.disclaimer) {
    disclaimers = [frontmatter.disclaimer, ...disclaimers];
  }

  return (
    <Layout itemScope itemType="http://schema.org/Article">
      <SEO
        title={frontmatter.title}
        description={frontmatter.excerpt}
        image={ frontmatter.featured_image }
        slug={ frontmatter.slug }
      />
      <Card css={cardCss}>
        <Article>
          <DangerousHTML component="h1" html={ frontmatter.title } itemProp="name headline" />
          <PostMeta post={currentPost} css={ postMetaStyle } />
          <FeaturedMedia { ...frontmatter } />
          { !frontmatter.opening ? null :
            <DangerousHTML component="p" html={ frontmatter.opening } />
          }
          <DangerousHTML html={ currentPost.tableOfContents } />
          <Banner sticky />
          <AttributesTable attributes={ frontmatter.attributes } />
          <DangerousHTML html={ currentPost.html } itemProp="articleBody" />
          { disclaimers.length === 0 ? null :
            disclaimers.map((disclaimer, index) => (
              <DangerousHTML
                key={ index }
                component="p"
                html={ disclaimer }
                className="disclaimer"
              />
            ))
          }
        </Article>
        <Vote campaign={ frontmatter.slug }>
          Ti è piaciuto questo articolo?
        </Vote>
        <FacebookButtons slug={frontmatter.slug} />
      </Card>
      <TagList
        tags={ frontmatter.tags }
        css={ cardCss }
      />
      <AuthorBox
        author={frontmatter.author}
        showProfileLink={true}
        css={cardCss}
        itemProp="author"
      />
      <NextPrev { ...props.pageContext } />
    </Layout>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      ...PostData
    }
  }
`