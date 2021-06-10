const visit = require(`unist-util-visit`);

module.exports = async (
  { markdownAST },
  { wrapperClassName = 'md-gallery', sliderClassName = 'md-gallery__slider' }
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
            <div class="${sliderClassName}">
              ${paragraph.children
                .filter(({ type }) => type === 'image')
                .map(
                  ({ url, title, alt }) => `
                  <picture>
                    <source media="(max-width: 599.95px)" srcset="${url}?nf_resize=fit&h=250 1x, ${url}?nf_resize=fit&h=500 2x">
                    <source media="(min-width: 600px)" srcset="${url}?nf_resize=fit&h=500 1x, ${url}?nf_resize=fit&h=1000 2x">
                    <img src="${url}" alt="${alt || ''}" title="${title || ''}" />
                    <figcaption>${title || ''}</figcaption>
                  </picture>
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
