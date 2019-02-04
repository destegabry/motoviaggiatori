module.exports = (postNode) => {
  const date = new Date(postNode.date);
  const month = `00${date.getMonth() + 1}`.substr(-2);
  return `/${date.getFullYear()}/${month}/${postNode.slug}/`
}