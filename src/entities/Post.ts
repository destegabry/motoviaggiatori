import { MarkdownData } from "./Markdown";
import { Author } from "./Author";
import { Category } from "./Category";
import { Tag } from "./Tag";

export interface MarkdownPost extends MarkdownData {
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

export interface Post extends Omit<MarkdownPost, "author" | "categories" | "tags"> {
  author: Author;
  categories: Category[];
  tags: Tag[];
}
