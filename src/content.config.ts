import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    tags: z.array(z.string()),
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
