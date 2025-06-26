import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import type { Post } from "../types";

type Data = {
    posts: Post[];
}

const adapter = new JSONFile<Data>("src/db/data.json");
const db = new Low<Data>(adapter, { posts: [] });

await db.read();

db.data ||= { posts: [] };

export default db;
