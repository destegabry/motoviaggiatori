import { Author } from './Author';
import { Category } from './Category';
import { CmsFrontmatterData } from './CmsFrontmatterData';

export type Post = {
  html?: string;
  frontmatter: CmsFrontmatterData & {
    featured_image?: string;
    date?: string;
    author?: Author;
    categories?: Array<Category>;
    tags?: Array<Category>;
    excerpt?: string;
  };
};
