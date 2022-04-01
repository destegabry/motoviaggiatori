import { Author } from "../entities/Author";
import { Category } from "../entities/Category";
import { MarkdownPost, Post } from "../entities/Post";
import { Tag } from "../entities/Tag";

export function getItemsBySlug<T extends { slug: string }>(list: T[]): Map<string, T> {
  return list.reduce(
    (bySlug, item) => bySlug.set(item.slug, item),
    new Map<string, T>()
  );
}


export function enhancePosts(posts: MarkdownPost[], allAuthors: Author[], allCategories: Category[], allTags: Tag[]): Post[] {
  const authorsBySlug = getItemsBySlug<Author>(allAuthors);
  const categoriesBySlug = getItemsBySlug<Category>(allCategories);
  const tagsBySlug = getItemsBySlug<Tag>(allTags);
  return posts.map((post) => ({
    ...post,
    author: authorsBySlug.get(post.author),
    categories: post.categories.map((category) =>
      categoriesBySlug.get(category)
    ),
    tags: post.tags.map((category) =>
      tagsBySlug.get(category)
    ),
  }));
}