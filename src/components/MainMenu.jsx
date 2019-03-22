import React from 'react'
import { Link } from 'gatsby'

import useAllCategories from '../hooks/use-all-categories'
import getCategoryUrl from '../utils/getCategoryUrl'

const MainMenu = () => {
  const categories = useAllCategories().reduce((accumulator, {node}) => {
    accumulator[node.frontmatter.slug] = node.frontmatter;
    return accumulator;
  }, {});

  return (
    <nav>
      <Link
        className={categories.itinerari.slug}
        to={getCategoryUrl(categories.itinerari.slug)}
      >{categories.itinerari.name}</Link>
      {/* <span>
        <Link
          className={categories.viaggi.slug}
          to={getCategoryUrl(categories.viaggi.slug)}
        >{categories.viaggi.name}</Link>
        <nav>
          <Link
            className={categories.marocco.slug}
            to={getCategoryUrl(categories.marocco.slug)}
          >{categories.marocco.name}</Link>
          <Link
            className={categories.romania.slug}
            to={getCategoryUrl(categories.romania.slug)}
          >{categories.romania.name}</Link>
        </nav>
      </span>
      <span>
        <Link
          className={categories.recensioni.slug}
          to={getCategoryUrl(categories.recensioni.slug)}
        >{categories.recensioni.name}</Link>
        <nav>
          <Link
            className={categories['protezione-moto'].slug}
            to={getCategoryUrl(categories['protezione-moto'].slug)}
          >{categories['protezione-moto'].name}</Link>
          <Link
            className={categories['valigie-e-borse-moto'].slug}
            to={getCategoryUrl(categories['valigie-e-borse-moto'].slug)}
          >{categories['valigie-e-borse-moto'].name}</Link>
          <Link
            className={categories.libri.slug}
            to={getCategoryUrl(categories.libri.slug)}
          >{categories.libri.name}</Link>
          <Link
            className={categories.gadget.slug}
            to={getCategoryUrl(categories.gadget.slug)}
          >{categories.gadget.name}</Link>
        </nav>
      </span> */}
      <Link to="/foto">Foto</Link>
      {/* <Link
        className={categories.video.slug}
        to={getCategoryUrl(categories.video.slug)}
      >{categories.video.name}</Link> */}
    </nav>
  );
}

export default MainMenu
