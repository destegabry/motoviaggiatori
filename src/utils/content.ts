import { MarkdownInstance } from "astro";
import { Author } from "../entities/Author";
import { Category } from "../entities/Category";
import { RawPost, Post } from "../entities/Post";
import { Tag } from "../entities/Tag";

export function getItemsBySlug<T extends { slug: string }>(
  list: MarkdownInstance<T>[]
): Map<string, MarkdownInstance<T>> {
  return list.reduce((bySlug, item) => bySlug.set(item.frontmatter.slug, item), new Map<string, MarkdownInstance<T>>());
}

export function enhancePosts(
  posts: MarkdownInstance<RawPost>[],
  allAuthors: MarkdownInstance<Author>[],
  allCategories: MarkdownInstance<Category>[],
  allTags: MarkdownInstance<Tag>[]
): MarkdownInstance<Post>[] {
  const authorsBySlug = getItemsBySlug<Author>(allAuthors);
  const categoriesBySlug = getItemsBySlug<Category>(allCategories);
  const tagsBySlug = getItemsBySlug<Tag>(allTags);
  return posts.map((post) => {
    const author = authorsBySlug.get(post.frontmatter.author);
    const categories = post.frontmatter.categories.map((category) => categoriesBySlug.get(category))
    const tags = post.frontmatter.tags.map((tag) => tagsBySlug.get(tag))

    return ({
      ...post,
      frontmatter: {
        ...frontmatterData,
        author,
        categories,
        tags,
      },
    })
  });
}
