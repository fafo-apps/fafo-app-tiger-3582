import { NextRequest, NextResponse } from "next/server";
import { createPost, listPosts } from "@/app/db/repositories/PostsRepository";

export async function GET() {
  const posts = await listPosts();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body?.title || !body?.slug || !body?.content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const post = await createPost({
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt ?? null,
      content: body.content,
      location: body.location ?? null,
      cover_image_url: body.cover_image_url ?? null,
      visited_on: body.visited_on ?? null,
    });
    return NextResponse.json(post, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
