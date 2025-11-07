"use client";
import { useState } from "react";

export default function NewPostPage() {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    location: "",
    cover_image_url: "",
    visited_on: "",
  });
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Saving...");
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        visited_on: form.visited_on || null,
        excerpt: form.excerpt || null,
        location: form.location || null,
        cover_image_url: form.cover_image_url || null,
      }),
    });
    if (res.ok) {
      setStatus("Saved! You can view it on the home page.");
      setForm({ title: "", slug: "", excerpt: "", content: "", location: "", cover_image_url: "", visited_on: "" });
    } else {
      const data = await res.json().catch(() => ({}));
      setStatus(data.error || "Something went wrong");
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="text-3xl font-semibold tracking-tight">Add a new post</h1>
        <p className="mt-2 text-sm text-zinc-600">Tip: slug is the short web address, for example "santorini-sunsets".</p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm font-medium">Title</span>
            <input className="rounded-md border border-zinc-300 px-3 py-2" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium">Slug</span>
            <input className="rounded-md border border-zinc-300 px-3 py-2" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium">Summary</span>
            <input className="rounded-md border border-zinc-300 px-3 py-2" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium">Story</span>
            <textarea className="min-h-40 rounded-md border border-zinc-300 px-3 py-2" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required />
          </label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-sm font-medium">Location</span>
              <input className="rounded-md border border-zinc-300 px-3 py-2" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </label>
            <label className="grid gap-2">
              <span className="text-sm font-medium">Visited on</span>
              <input type="date" className="rounded-md border border-zinc-300 px-3 py-2" value={form.visited_on} onChange={(e) => setForm({ ...form, visited_on: e.target.value })} />
            </label>
          </div>
          <label className="grid gap-2">
            <span className="text-sm font-medium">Cover Image URL</span>
            <input className="rounded-md border border-zinc-300 px-3 py-2" value={form.cover_image_url} onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })} />
          </label>

          <button type="submit" className="mt-2 rounded-md bg-sky-700 px-4 py-2 text-white hover:bg-sky-800">Publish</button>
          {status && <p className="text-sm text-zinc-600">{status}</p>}
        </form>
      </main>
    </div>
  );
}
