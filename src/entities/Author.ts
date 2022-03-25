import { MarkdownData } from "./Markdown";

interface AuthorLink {
  url: string;
  title?: string;
}

export interface Author extends MarkdownData {
  slug: string;
  avatar: string;
  links?: AuthorLink[];
}
