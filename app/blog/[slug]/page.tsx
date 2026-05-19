import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buttonVariants } from "@/components/ui/button";
import {
  getBlogPostBySlug,
  getBlogSlugs,
  getRelatedPosts,
  PILLAR_LABELS,
} from "@/lib/blog";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { PRICE_DISPLAY } from "@/lib/utils";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://filterfresh.example.com";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: Params }): Metadata {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: "article",
    },
  };
}

function articleSchema(post: NonNullable<ReturnType<typeof getBlogPostBySlug>>) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.published_at,
    dateModified: post.published_at,
    author: {
      "@type": "Organization",
      name: post.author ?? "Filter Fresh team",
      url: SITE_URL,
    },
    publisher: { "@id": `${SITE_URL}#business` },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    keywords: post.target_keyword,
  };
}

export default function BlogPostPage({ params }: { params: Params }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, 3);
  const crumbs = breadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Blog", url: `${SITE_URL}/blog` },
    { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(post)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      {post.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(post.faqs)) }}
        />
      )}

      <article className="container py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wide text-primary">
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>{" "}
            / {PILLAR_LABELS[post.pillar]}
          </div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span>{post.author ?? "Filter Fresh team"}</span>
            <span aria-hidden>•</span>
            <span>
              {new Date(post.published_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span aria-hidden>•</span>
            <span>{post.readingMinutes} min read</span>
          </div>

          <div
            className="prose-blog mt-8"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {post.faqs.length > 0 && (
            <section className="mt-12 border-t pt-10">
              <h2 className="text-2xl font-bold tracking-tight">
                Frequently asked
              </h2>
              <dl className="mt-6 space-y-4">
                {post.faqs.map((f) => (
                  <div key={f.q} className="rounded-lg border bg-card p-5">
                    <dt className="font-semibold">{f.q}</dt>
                    <dd className="mt-2 text-sm text-muted-foreground">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <section className="mt-12 rounded-2xl border bg-card p-8 text-center shadow-pop">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {PRICE_DISPLAY} flat. Temecula to San Diego.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              Cartridge, DE, and sand filters cleaned, inspected, and pressure-tested.
              Same-week scheduling.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/book" className={buttonVariants({ size: "lg" })}>
                Book a cleaning
              </Link>
              <Link
                href="/pool-filter-cleaning"
                className={buttonVariants({ size: "lg", variant: "outline" })}
              >
                Read the service guide
              </Link>
            </div>
          </section>

          {related.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold tracking-tight">Keep reading</h2>
              <ul className="mt-4 grid gap-4 md:grid-cols-3">
                {related.map((r) => (
                  <li key={r.slug} className="rounded-lg border bg-card p-5">
                    <div className="text-xs font-semibold uppercase tracking-wide text-primary">
                      {PILLAR_LABELS[r.pillar]}
                    </div>
                    <Link
                      href={`/blog/${r.slug}`}
                      className="mt-2 block font-semibold hover:text-primary"
                    >
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
