import Link from "next/link";
import type { Metadata } from "next";
import { getAllBlogPosts, PILLAR_LABELS } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Pool Filter Knowledge | Filter Fresh Blog",
  description:
    "Plain-language guides to pool filter cleaning, costs, equipment, and seasonal care across Temecula and San Diego County.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();
  return (
    <section className="container py-14 md:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="text-sm font-semibold uppercase tracking-wide text-primary">
          Filter Fresh blog
        </div>
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
          Pool filter knowledge, plain English
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Education, cost, and seasonal guides written by people who service pool filters
          for a living across Temecula and San Diego County.
        </p>

        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {posts.map((p) => (
            <li key={p.slug} className="flex flex-col rounded-lg border bg-card p-6">
              <div className="text-xs font-semibold uppercase tracking-wide text-primary">
                {PILLAR_LABELS[p.pillar]}
              </div>
              <h2 className="mt-2 text-xl font-semibold">
                <Link href={`/blog/${p.slug}`} className="hover:text-primary">
                  {p.title}
                </Link>
              </h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.description}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>{new Date(p.published_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                <span>{p.readingMinutes} min read</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
