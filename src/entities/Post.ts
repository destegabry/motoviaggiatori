import { MarkdownInstance } from "astro";
import { Author } from "./Author";
import { Category } from "./Category";
import { Tag } from "./Tag";

export interface RawPost {
  title: string;
  date: string;
  permalink: string;
  author: string;
  excerpt: string;
  opening: string;
  featured_image: string;
  categories: string[];
  tags: string[];
  language?: string;
  featured_youtube?: string;
}

export interface Post extends Omit<RawPost, "author" | "categories" | "tags"> {
  author: MarkdownInstance<Author>;
  categories: MarkdownInstance<Category>[];
  tags: MarkdownInstance<Tag>[];
}
