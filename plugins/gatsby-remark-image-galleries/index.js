const visit = require(`unist-util-visit`);

module.exports = async (
  { markdownAST },
  { wrapperClassName = 'md-gallery', scrollerClassName = 'md-gallery-scroller', responsive = [] }
) => {
  visit(markdownAST, 'paragraph', (paragraph) => {
    if (paragraph.children.length > 0) {
      let allChildrenAreImages = true;
      for (let i = 0; i < paragraph.children.length && allChildrenAreImages; i++) {
        const child = paragraph.children[i];
        allChildrenAreImages = child.type === 'image' || child.value === '\n';
      }
      if (allChildrenAreImages) {
        paragraph.type = 'html';
        paragraph.value = `
          <div class="${wrapperClassName}">
            <div class="${scrollerClassName}">
              ${paragraph.children
                .filter(({ type }) => type === 'image')
                .map(
                  ({ url, title, alt }) => `
                    <figure>
                      <picture>
                        ${responsive
                          .map(
                            ({ mediaQuery, height }) =>
                              `<source
                                  media="${mediaQuery}"
                                  srcset="
                                    ${url}?nf_resize=fit&h=${height} 1x,
                                    ${url}?nf_resize=fit&h=${height * 2} 2x
                                  "
                                />`
                          )
                          .join('')}
                        <img src="${url}" alt="${alt}" loading="lazy" />
                      </picture>
                      ${title ? `<figcaption>${title}</figcaption>` : ``}
                    </figure>
                  `
                )
                .join('')}
            </div>
          </div>
        `;
        delete paragraph.children;
      }
    }
  });
  return markdownAST;
};
