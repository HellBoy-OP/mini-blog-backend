import z from "zod";


export const PostSchema = z.object({
    id: z.number(),
    title: z.string().min(1, "Title is required"),
    body: z.string().min(1, "Body is required"),
})

export type Post = z.infer<typeof PostSchema>;
