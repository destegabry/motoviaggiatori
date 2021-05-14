const visit = require(`unist-util-visit`);

// TODO: import from theme as soon as gatsby-plugin-ts-config@2 is released
const minWidthMediaQuery = `(min-width: 600px)`;
const maxWidthMediaQuery = `(max-width: 599.95px)`;
const height = 500;
const smHeight = 250;


module.exports = async ({ markdownAST }, pluginOptions) => {
  visit(markdownAST, "paragraph", paragraph => {
    if (paragraph.children.length > 0) {
      let allChildrenAreImages = true;
      for (let i = 0; i < paragraph.children.length && allChildrenAreImages; i++) {
        const child = paragraph.children[i];
        allChildrenAreImages = child.type === 'image' || child.value === '\n';
      }
      if (allChildrenAreImages) {
        paragraph.type = 'html';
        paragraph.value = `
          <div class="md-gallery">
            <div class="md-gallery-scroller">
              ${
                paragraph.children
                  .filter(({ type }) => type === 'image')
                  .map(({ url, title, alt }) => `
                    <figure>
                      <picture>
                        <source
                          media="${minWidthMediaQuery}"
                          srcset="
                            ${url}?nf_resize=fit&h=${height} 1x,
                            ${url}?nf_resize=fit&h=${height * 2} 2x
                          "
                        />
                        <source
                          media="${maxWidthMediaQuery}"
                          srcset="
                          ${url}?nf_resize=fit&h=${smHeight} 1x,
                          ${url}?nf_resize=fit&h=${smHeight * 2} 2x
                          "
                        />
                        <img src="${url}" alt="${alt}" />
                      </picture>
                      <figcaption>${title}</figcaption>
                    </figure>
                  `)
                  .join('')
              }
            </div>
          </div>
        `;
        delete paragraph.children;
      }
    }
  })
  return markdownAST;
}