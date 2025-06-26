import type { Request, Response } from "express";
import db from "../db/lowdb";
import { PostSchema } from "../types";


export const getAllPosts = async (_req: Request, res: Response) => {
    await db.read();
    const posts = db.data.posts;

    if (!posts.length) {
        res.status(404).json({ message: "No posts found" });
    } else {
        res.status(200).json({ message: "Posts fetched successfully", posts });
    }
}

export const getPostById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    await db.read();
    const post = db.data.posts.find(post => post.id === id);

    if (!post) {
        res.status(404).json({ message: "Post not found" });
    } else {
        res.status(200).json({ message: "Post fetched successfully", post });
    }
}

export const createPost = async (req: Request, res: Response) => {
    const parseResult = PostSchema.omit({ id: true }).safeParse(req.body);

    if (!parseResult.success) {
        res.status(400).json({ message: "Invalid post data", errors: parseResult.error.errors });
        return;
    }

    await db.read();

    const newPost = {
        id: db.data.posts.length + 1,
        ...parseResult.data
    };

    db.data.posts.push(newPost);
    await db.write();

    res.status(201).json({ message: "Post created successfully", post: newPost });
}

export const updatePost = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { title, body } = req.body;

    await db.read();
    const postIndex = db.data.posts.findIndex(post => post.id === id);

    if (postIndex === -1 || postIndex === undefined) {
        res.status(404).json({ message: "Post not found" });
        return;
    }

    if (title) db.data.posts[postIndex].title = title;
    if (body) db.data.posts[postIndex].body = body;

    await db.write();

    res.status(200).json({ message: "Post updated successfully", post: db.data.posts[postIndex] });
}

export const deletePost = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    await db.read();
    const postIndex = db.data.posts.findIndex(post => post.id === id);

    if (postIndex === -1 || postIndex === undefined) {
        res.status(404).json({ message: "Post not found" });
        return;
    }

    db.data.posts.splice(postIndex, 1);
    await db.write();

    res.status(200).json({ message: "Post deleted successfully" });
}
