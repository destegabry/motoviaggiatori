import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import PageLink from './PageLink'
import CategoryLink from './CategoryLink'

const MainMenu = () => (
  <StaticQuery
    query={graphql`
      query mainMenuQuery {
        allWordpressPage {
          edges {
            node {
              slug
              title
            }
          }
        }
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
    render={({allWordpressPage, allWordpressCategory}) => {
      const pages = allWordpressPage.edges.reduce((pages, {node}) => ({
        [node.slug]: node,
        ...pages
      }), {});

      const categories = allWordpressCategory.edges.reduce((categories, {node}) => ({
        [node.slug]: node,
        ...categories
      }), {});

      return (
        <nav>
          <CategoryLink className={categories.itinerari.slug} category={categories.itinerari} categories={allWordpressCategory.edges} />
          <span>
            <CategoryLink className={categories.viaggi.slug} category={categories.viaggi} categories={allWordpressCategory.edges} />
            <nav>
              <CategoryLink className={categories.marocco.slug} category={categories.marocco} categories={allWordpressCategory.edges} />
            </nav>
          </span>
          <span>
            <CategoryLink className={categories.recensioni.slug} category={categories.recensioni} categories={allWordpressCategory.edges} />
            <nav>
              <CategoryLink className={categories['protezione-moto'].slug} category={categories['protezione-moto']} categories={allWordpressCategory.edges} />
              <CategoryLink className={categories['valigie-e-borse-moto'].slug} category={categories['valigie-e-borse-moto']} categories={allWordpressCategory.edges} />
              <CategoryLink className={categories.libri.slug} category={categories.libri} categories={allWordpressCategory.edges} />
              <CategoryLink className={categories.gadget.slug} category={categories.gadget} categories={allWordpressCategory.edges} />
            </nav>
          </span>
          <CategoryLink className={categories.video.slug} category={categories.video} categories={allWordpressCategory.edges} />
          <PageLink className={pages.foto.slug} page={pages.foto} />
          <PageLink className={pages['chi-siamo'].slug} page={pages['chi-siamo']} />
          <PageLink className={pages.contatti.slug} page={pages.contatti} />
        </nav>
      );
    }}
  />
)

export default MainMenu
