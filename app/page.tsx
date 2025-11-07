import Link from "next/link";
import { listPosts } from "@/app/db/repositories/PostsRepository";

export default async function Home() {
  const posts = await listPosts();
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <header className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-4xl font-semibold tracking-tight">Greece Trip Blog</h1>
        <p className="mt-2 text-zinc-600">Stories and photos from the islands, mountains, and ancient cities.</p>
      </header>

      <main className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-6 pb-20 sm:grid-cols-2">
        {posts.map((p) => (
          <Link key={p.id} href={`/posts/${p.slug}`} className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md">
            <div className="aspect-[16/10] w-full bg-zinc-100">
              {p.cover_image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.cover_image_url} alt={p.title} className="h-full w-full object-cover" />
              ) : null}
            </div>
            <div className="p-4">
              <div className="text-xs uppercase tracking-wide text-sky-700">{p.location ?? "Greece"}</div>
              <h2 className="mt-1 text-lg font-semibold group-hover:text-sky-800">{p.title}</h2>
              <p className="mt-1 line-clamp-2 text-sm text-zinc-600">{p.excerpt ?? p.content.slice(0, 120) + "..."}</p>
              <div className="mt-3 text-xs text-zinc-500">{p.visited_on ? new Date(p.visited_on).toLocaleDateString() : ""}</div>
            </div>
          </Link>
        ))}
      </main>

      <footer className="mx-auto max-w-5xl px-6 pb-16 text-center text-sm text-zinc-500">
        Made with love for your Greece adventure.
      </footer>
    </div>
  );
}
