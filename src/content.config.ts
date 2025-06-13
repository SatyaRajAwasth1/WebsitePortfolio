import { defineCollection, z } from "astro:content";
import { BLOG_CATEGORY_NAMES } from "./constants/categories";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    tags: z.array(z.string()),
    category: z.enum([...BLOG_CATEGORY_NAMES] as [string, ...string[]]),
    coverImage: z.string().optional(),
    showTOC: z.boolean().optional(),
    series: z
      .object({
        id: z.string(),
        title: z.string(),
        part: z.number(),
      })
      .optional(),
  }),
});

export const collections = {
  blog,
};
