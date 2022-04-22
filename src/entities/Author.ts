interface AuthorLink {
  url: string;
  title?: string;
}

export interface Author {
  title: string;
  slug: string;
  avatar: string;
  links?: AuthorLink[];
}
