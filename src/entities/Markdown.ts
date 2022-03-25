export interface MarkdownHeader {
  depth: number;
  slug: string;
  text: string;
}

export interface MarkdownContent {
  headers: MarkdownHeader[];
  html: string;
  source: string;
}

export interface MarkdownFrontmatter {
  title: string;
}

export interface MarkdownData extends MarkdownFrontmatter {
  file: {
    pathname: string;
  };
  content: MarkdownContent;
}
