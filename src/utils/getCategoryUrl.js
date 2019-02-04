function getSlug(categoryNode, allCategoriesNodes, slug) {
  slug = `${categoryNode.slug}/${slug}`;
  if (!categoryNode.parent_element) {
    return slug;
  }
  const {node} = allCategoriesNodes.find(({node}) => node.id === categoryNode.parent_element.id);
  return getSlug(node, allCategoriesNodes, slug);
}

module.exports = (categoryNode, allCategoriesNodes) => {
  const url =  `/categoria/${getSlug(categoryNode, allCategoriesNodes, '')}`
  return url;
}