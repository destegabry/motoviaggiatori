import { MarkdownData } from "./Markdown";
import { Author } from "./Author";
import { Category } from "./Category";

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
}

export interface Post extends Omit<MarkdownPost, "author" | "categories"> {
  author: Author;
  categories: Category[];
}
