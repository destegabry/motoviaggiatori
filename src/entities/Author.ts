import { CmsFrontmatterData } from './CmsFrontmatterData';

export type Author = {
  html?: string;
  frontmatter: CmsFrontmatterData & {
    avatar?: string;
    links?: Array<{
      title?: string;
      url: string;
    }>;
  };
};
