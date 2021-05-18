import { CmsFrontmatterData } from './CmsFrontmatterData';

export type Category = {
  html?: string;
  frontmatter: CmsFrontmatterData;
  fields?: {
    disclaimer_html?: string;
  };
};
