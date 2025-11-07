import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug } from "@/app/db/repositories/PostsRepository";

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();

  return (
    <article className="min-h-screen bg-white">
      <header className="mx-auto max-w-3xl px-6 pb-4 pt-10">
        <Link href="/" className="text-sm text-sky-700 hover:underline">← Back to all posts</Link>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">{post.title}</h1>
        <div className="mt-2 text-zinc-600">
          <span>{post.location ?? "Greece"}</span>
          {post.visited_on ? <span className="ml-2">• {new Date(post.visited_on).toLocaleDateString()}</span> : null}
        </div>
      </header>

      {post.cover_image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.cover_image_url} alt={post.title} className="mx-auto my-6 max-h-[60vh] w-full max-w-5xl rounded-2xl object-cover" />
      ) : null}

      <div className="prose prose-zinc mx-auto max-w-3xl px-6 pb-20 leading-relaxed">
        <p className="whitespace-pre-line">{post.content}</p>
      </div>
    </article>
  );
}
