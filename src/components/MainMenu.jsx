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
      <span>
        <Link
          className={categories.viaggi.slug}
          to={getCategoryUrl(categories.viaggi.slug)}
        >{categories.viaggi.name}</Link>
        <nav>
          <Link
            className={categories['viaggi/marocco'].slug}
            to={getCategoryUrl(categories['viaggi/marocco'].slug)}
          >{categories['viaggi/marocco'].name}</Link>
          <Link
            className={categories['viaggi/romania'].slug}
            to={getCategoryUrl(categories['viaggi/romania'].slug)}
          >{categories['viaggi/romania'].name}</Link>
        </nav>
      </span>
      <span>
        <Link
          className={categories.recensioni.slug}
          to={getCategoryUrl(categories.recensioni.slug)}
        >{categories.recensioni.name}</Link>
        <nav>
          <Link
            className={categories['recensioni/protezione-moto'].slug}
            to={getCategoryUrl(categories['recensioni/protezione-moto'].slug)}
          >{categories['recensioni/protezione-moto'].name}</Link>
          {/* <Link
            className={categories['valigie-e-borse-moto'].slug}
            to={getCategoryUrl(categories['valigie-e-borse-moto'].slug)}
          >{categories['valigie-e-borse-moto'].name}</Link> */}
          <Link
            className={categories['recensioni/libri'].slug}
            to={getCategoryUrl(categories['recensioni/libri'].slug)}
          >{categories['recensioni/libri'].name}</Link>
          <Link
            className={categories['recensioni/gadget'].slug}
            to={getCategoryUrl(categories['recensioni/gadget'].slug)}
          >{categories['recensioni/gadget'].name}</Link>
        </nav>
      </span>
      <Link to="/foto">Foto</Link>
      <Link
        className={categories.video.slug}
        to={getCategoryUrl(categories.video.slug)}
      >{categories.video.name}</Link>
    </nav>
  );
}

export default MainMenu
