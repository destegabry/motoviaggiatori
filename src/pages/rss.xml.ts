import rss from '@astrojs/rss';
import { MarkdownInstance } from 'astro';
import { Author } from '../entities/Author';
import { Category } from '../entities/Category';
import { RawPost } from '../entities/Post';
import { Tag } from '../entities/Tag';
import { enhancePosts } from '../utils/content';

const allPostsRequest = import.meta.glob<MarkdownInstance<RawPost>>("../../../../content/posts/*.md", { eager: true });
const allAuthorsRequest = import.meta.glob<MarkdownInstance<Author>>("../../../../content/authors/*.md", { eager: true });
const allCategoriesRequest = import.meta.glob<MarkdownInstance<Category>>("../../../../content/categories/*.md", { eager: true });
const allTagsRequest = import.meta.glob<MarkdownInstance<Tag>>("../../../../content/tags/*.md", { eager: true });

const allPosts = Object.values(allPostsRequest);
const allAuthors = Object.values(allAuthorsRequest);
const allCategories = Object.values(allCategoriesRequest);
const allTags = Object.values(allTagsRequest);

const posts = enhancePosts(allPosts, allAuthors, allCategories, allTags);
posts.sort((a, b) => Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date))

export const get = () => rss({
  // `<title>` field in output xml
  title: import.meta.env.SITE_NAME,
  // `<description>` field in output xml
  description: import.meta.env.SITE_DESCRIPTION,
  // base URL for RSS <item> links
  // SITE will use "site" from your project's astro.config.
  site: import.meta.env.SITE,
  // list of `<item>`s in output xml
  // simple example: generate items for every md file in /src/pages
  // see "Generating items" section for required frontmatter and advanced use cases
  items: posts
    .map((post) => ({
      link: `${import.meta.env.SITE}${post.frontmatter.permalink}`,
      title: post.frontmatter.title,
      pubDate: new Date(post.frontmatter.date),
      description: post.frontmatter.excerpt,
      customData: [
        `<dc:creator>${post.frontmatter.author.frontmatter.title}</dc:creator>`,
        ...post.frontmatter.categories.map((category) => `<category>${category.frontmatter.title}</category>`)
      ].join('')
    })),
  // (optional) inject custom xml
  customData: `<language>it-it</language>`,
});
