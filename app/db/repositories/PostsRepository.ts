import { pool } from "@/app/db/pool";

export type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  location: string | null;
  cover_image_url: string | null;
  visited_on: string | null; // ISO date string
  created_at: string; // ISO timestamp
};

export async function listPosts(): Promise<Post[]> {
  const { rows } = await pool.query<Post>(
    `SELECT id, title, slug, excerpt, content, location, cover_image_url, visited_on::text, created_at::text
     FROM posts
     ORDER BY visited_on DESC NULLS LAST, created_at DESC
     LIMIT 50`
  );
  return rows;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { rows } = await pool.query<Post>(
    `SELECT id, title, slug, excerpt, content, location, cover_image_url, visited_on::text, created_at::text
     FROM posts
     WHERE slug = $1
     LIMIT 1`,
    [slug]
  );
  return rows[0] ?? null;
}

export async function createPost(input: {
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  location?: string | null;
  cover_image_url?: string | null;
  visited_on?: string | null; // ISO date
}): Promise<Post> {
  const { rows } = await pool.query<Post>(
    `INSERT INTO posts (title, slug, excerpt, content, location, cover_image_url, visited_on)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id, title, slug, excerpt, content, location, cover_image_url, visited_on::text, created_at::text`,
    [
      input.title,
      input.slug,
      input.excerpt ?? null,
      input.content,
      input.location ?? null,
      input.cover_image_url ?? null,
      input.visited_on ?? null,
    ]
  );
  return rows[0];
}
