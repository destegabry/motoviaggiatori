import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'

import CategoryLink from './CategoryLink'

const MainMenu = () => (
  <StaticQuery
    query={graphql`
      query mainMenuQuery {
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
    render={({allWordpressCategory}) => {
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
              <CategoryLink className={categories.romania.slug} category={categories.romania} categories={allWordpressCategory.edges} />
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
          <Link to="/foto">Foto</Link>
          <CategoryLink className={categories.video.slug} category={categories.video} categories={allWordpressCategory.edges} />
        </nav>
      );
    }}
  />
)

export default MainMenu
