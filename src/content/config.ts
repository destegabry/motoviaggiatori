import { z, defineCollection } from 'astro:content';

const authors = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    avatar: image().refine((img) => img.width >= 512),
    links: z.object({
      title: z.string().optional(),
      url: z.string().url(),
    }).array(),
  }),
});

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    excerpt: z.string(),
    date: z.date(),
    modified: z.date().optional(),
    categories: z.string().array().min(1),
    tags: z.string().array().min(1),
  }),
});

const categories = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
  }),
});

const tags = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = {
  authors,
  posts,
  categories,
  tags
};