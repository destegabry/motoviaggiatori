const visit = require(`unist-util-visit`);

module.exports = async ({ markdownAST }, { wrapperClassName = 'md-gallery' }) => {
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
            ${paragraph.children
              .filter(({ type }) => type === 'image')
              .map(({ url, title, alt }) => `<img src="${url}" alt="${alt}" title="${title}" />`)
              .join('')}
          </div>
        `;
        delete paragraph.children;
      }
    }
  });
  return markdownAST;
};
