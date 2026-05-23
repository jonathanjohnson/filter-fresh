import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Pill } from "@/components/ui/pill";
import { Arrow } from "@/components/ui/icons";
import { Avatar } from "@/components/blog/avatar";
import { ArticleToc } from "@/components/blog/article-toc";
import { ShareRail } from "@/components/blog/share-rail";
import {
  getBlogPostBySlug,
  getBlogSlugs,
  getRelatedPosts,
  PILLAR_LABELS,
} from "@/lib/blog";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

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
      name: post.author ?? "Filter Fresh Pools team",
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
  const articleUrl = `${SITE_URL}/blog/${post.slug}`;
  const author = post.author ?? "Filter Fresh Pools team";

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

      <article>
        <section className="bg-ff-bg px-[clamp(22px,4vw,64px)] py-[clamp(48px,6vw,64px)] pb-9">
          <div className="ff-container max-w-[760px]">
            <div className="mb-4 text-[13px] text-ff-ink-3">
              <Link href="/blog" className="font-medium text-ff-brand-deep hover:underline">
                Blog
              </Link>
              <span className="mx-2 text-ff-line">/</span>
              <span>{PILLAR_LABELS[post.pillar]}</span>
            </div>
            <h1 className="ff-display" style={{ fontSize: "clamp(40px, 5.5vw, 60px)" }}>
              {post.title}
            </h1>
            <p className="ff-body-lg mt-4">{post.description}</p>
            <div className="mt-7 flex flex-wrap items-center gap-4 border-t border-ff-line pt-5 text-[13px] text-ff-ink-2">
              <Avatar name={author} />
              <div>
                <div className="font-semibold text-ff-ink">{author}</div>
                <div className="text-ff-ink-3">
                  Field notes from the truck · Filter Fresh Pools
                </div>
              </div>
              <div className="ml-auto flex flex-wrap gap-4 text-ff-ink-3">
                <span>
                  {new Date(post.published_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span>{post.readingMinutes} min read</span>
              </div>
            </div>
          </div>
        </section>

        <section className="px-[clamp(22px,4vw,64px)] pb-9">
          <div className="ff-container max-w-[920px]">
            <div
              className="ff-placeholder deep flex h-[280px] items-center justify-center md:h-[460px]"
              style={{ borderRadius: 16 }}
            >
              <span className="lbl">
                HERO · {post.featured_alt.split(",")[0]?.trim() ?? "featured image"}
              </span>
            </div>
            <div className="mt-3 text-center text-xs italic text-ff-ink-3">
              {post.featured_alt}
            </div>
          </div>
        </section>

        <section className="px-[clamp(22px,4vw,64px)] pb-[clamp(56px,7vw,96px)]">
          <div className="mx-auto grid max-w-[1140px] gap-10 lg:grid-cols-[200px_1fr_200px] lg:gap-14">
            <div className="lg:sticky lg:top-[90px] lg:self-start">
              <ArticleToc items={post.toc} />
            </div>

            <div
              className="prose-blog"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            <div className="lg:sticky lg:top-[90px] lg:self-start">
              <ShareRail url={articleUrl} title={post.title} />
            </div>
          </div>
        </section>

        {post.faqs.length > 0 && (
          <section className="ff-section tint">
            <div className="ff-container max-w-[820px]">
              <div className="ff-eyebrow">Frequently asked</div>
              <h2 className="ff-h2 mt-3">More on this topic.</h2>
              <dl className="mt-8 space-y-4">
                {post.faqs.map((f) => (
                  <div key={f.q} className="ff-card padded">
                    <dt className="ff-h4 mb-2">{f.q}</dt>
                    <dd className="ff-body text-[15px]">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="ff-section tint pb-20 pt-14">
            <div className="ff-container">
              <div className="ff-eyebrow">Keep reading</div>
              <h2 className="ff-h2 mb-7 mt-3">More from the truck.</h2>
              <div className="ff-grid-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="ff-card flex flex-col overflow-hidden bg-ff-paper transition-shadow hover:shadow-md"
                  >
                    <div
                      className="ff-placeholder h-[180px] flex-none"
                      style={{ borderRadius: 0 }}
                    >
                      <span className="lbl">POST · {r.slug}.jpg</span>
                    </div>
                    <div className="p-5">
                      <div
                        className="text-[11px] font-semibold uppercase text-ff-brand-deep"
                        style={{ letterSpacing: "0.06em" }}
                      >
                        {PILLAR_LABELS[r.pillar]} · {r.readingMinutes} min
                      </div>
                      <h3 className="mt-2 text-lg font-semibold tracking-[-0.01em] text-ff-ink">
                        {r.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="ff-section">
          <div className="ff-container">
            <div
              className="ff-card mx-auto max-w-[820px] overflow-hidden rounded-[20px] p-10 text-center"
              style={{ boxShadow: "var(--ff-shadow-lg)" }}
            >
              <Pill>$75 flat · same-week slots</Pill>
              <h2 className="ff-h1 mt-4">
                Book a $75 clean.{" "}
                <span className="font-serif font-normal italic">No upsells.</span>
              </h2>
              <p className="ff-body-lg mx-auto mt-3 max-w-[520px]">
                Cartridge, DE, or sand &mdash; same flat price. Temecula through San Diego County.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="/book" className="ff-btn ff-btn--primary ff-btn--lg">
                  Book a cleaning <Arrow />
                </Link>
                <Link href="/pool-filter-cleaning" className="ff-btn ff-btn--ghost ff-btn--lg">
                  Read the service guide
                </Link>
              </div>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
