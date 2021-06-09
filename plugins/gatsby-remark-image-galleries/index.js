const visit = require(`unist-util-visit`);

module.exports = async ({ markdownAST }, { wrapperClassName = 'swiper-container' }) => {
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
            <div class="swiper-wrapper">
              ${paragraph.children
                .filter(({ type }) => type === 'image')
                .map(
                  ({ url, title, alt }) => `
                  <div class="swiper-slide">
                    <picture>
                      <img src="${url}" alt="${alt}" title="${title}" />
                      <figcaption>${title}</figcaption>
                    </picture>
                  </div>
                `
                )
                .join('')}
            </div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
        `;
        delete paragraph.children;
      }
    }
  });
  return markdownAST;
};
