import { Author } from './Author';
import { Category } from './Category';
import { CmsFrontmatterData } from './CmsFrontmatterData';
import { Tag } from './Tag';

export type Post = {
  html?: string;
  fields?: {
    opening_html?: string;
    disclaimer_html?: string;
  };
  frontmatter: CmsFrontmatterData & {
    featured_image?: string;
    featured_youtube?: string;
    date?: string;
    modified?: string;
    author?: Author;
    categories?: Array<Category>;
    tags?: Array<Tag>;
    excerpt?: string;
    attributes?: Array<{ key: string; value: string }>;
  };
};
