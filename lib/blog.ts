import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

export type BlogPostPillar = "education" | "cost" | "local";

export type BlogPostFaq = { q: string; a: string };

export type TocEntry = { id: string; text: string; depth: 2 | 3 };

export type BlogPostFrontmatter = {
  title: string;
  slug: string;
  description: string;
  pillar: BlogPostPillar;
  target_keyword: string;
  search_volume?: number;
  keyword_difficulty?: number;
  published_at: string;
  featured_alt: string;
  author?: string;
  faqs: BlogPostFaq[];
};

export type BlogPost = BlogPostFrontmatter & {
  contentHtml: string;
  contentMarkdown: string;
  readingMinutes: number;
  toc: TocEntry[];
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function isPostFile(name: string): boolean {
  return name.endsWith(".md") && !name.startsWith("_");
}

function parseFrontmatter(raw: string): { data: BlogPostFrontmatter; body: string } {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) {
    throw new Error("Missing frontmatter");
  }
  const yaml = match[1];
  const body = match[2];
  const data = parseSimpleYaml(yaml) as unknown as BlogPostFrontmatter;
  if (!data.faqs) data.faqs = [];
  return { data, body };
}

// Minimal YAML parser tuned for our flat frontmatter shape. Supports:
//   key: scalar value
//   key: "quoted with colon: or special chars"
//   key:
//     - item
//     - item
//   key:
//     - q: question text
//       a: answer text
function parseSimpleYaml(yaml: string): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  const lines = yaml.split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith("#")) {
      i++;
      continue;
    }
    const m = line.match(/^([a-z_][a-z0-9_]*):\s*(.*)$/i);
    if (!m) {
      i++;
      continue;
    }
    const key = m[1];
    const inline = m[2].trim();

    if (inline) {
      result[key] = parseScalar(inline);
      i++;
      continue;
    }

    // Block list
    const items: unknown[] = [];
    i++;
    while (i < lines.length && lines[i].startsWith("  ")) {
      const itemLine = lines[i];
      if (itemLine.trim().startsWith("- ")) {
        const firstField = itemLine.trim().slice(2);
        if (firstField.includes(":")) {
          const obj: Record<string, unknown> = {};
          const mm = firstField.match(/^([a-z_][a-z0-9_]*):\s*(.*)$/i);
          if (mm) obj[mm[1]] = parseScalar(mm[2]);
          i++;
          while (
            i < lines.length &&
            lines[i].startsWith("    ") &&
            !lines[i].trim().startsWith("- ")
          ) {
            const sub = lines[i].trim();
            const sm = sub.match(/^([a-z_][a-z0-9_]*):\s*(.*)$/i);
            if (sm) obj[sm[1]] = parseScalar(sm[2]);
            i++;
          }
          items.push(obj);
        } else {
          items.push(parseScalar(firstField));
          i++;
        }
      } else {
        i++;
      }
    }
    result[key] = items;
  }
  return result;
}

function parseScalar(raw: string): unknown {
  const trimmed = raw.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).replace(/\\"/g, '"');
  }
  if (/^-?\d+$/.test(trimmed)) return Number(trimmed);
  if (/^-?\d+\.\d+$/.test(trimmed)) return Number(trimmed);
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  return trimmed;
}

let cache: BlogPost[] | null = null;

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[^;]+;/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function injectHeadingIdsAndExtractToc(html: string): {
  html: string;
  toc: TocEntry[];
} {
  const toc: TocEntry[] = [];
  const seen = new Set<string>();
  const withIds = html.replace(/<(h[23])>([^<]+)<\/\1>/g, (_, tag, text) => {
    let id = slugifyHeading(text);
    let n = 2;
    while (seen.has(id)) {
      id = `${slugifyHeading(text)}-${n++}`;
    }
    seen.add(id);
    const depth = tag === "h2" ? 2 : 3;
    toc.push({ id, text, depth });
    return `<${tag} id="${id}">${text}</${tag}>`;
  });
  return { html: withIds, toc };
}

function loadAll(): BlogPost[] {
  if (cache) return cache;
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter(isPostFile);
  marked.setOptions({ gfm: true, breaks: false });
  const posts: BlogPost[] = files.map((file) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data, body } = parseFrontmatter(raw);
    const rawHtml = marked.parse(body) as string;
    const { html: contentHtml, toc } = injectHeadingIdsAndExtractToc(rawHtml);
    const words = body.split(/\s+/).filter(Boolean).length;
    return {
      ...data,
      contentMarkdown: body,
      contentHtml,
      readingMinutes: Math.max(1, Math.round(words / 220)),
      toc,
    };
  });
  posts.sort(
    (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );
  cache = posts;
  return posts;
}

export function getAllBlogPosts(): BlogPost[] {
  return loadAll();
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return loadAll().find((p) => p.slug === slug);
}

export function getBlogSlugs(): string[] {
  return loadAll().map((p) => p.slug);
}

export function getRelatedPosts(slug: string, n = 3): BlogPost[] {
  const all = loadAll();
  const current = all.find((p) => p.slug === slug);
  if (!current) return [];
  return all
    .filter((p) => p.slug !== slug)
    .sort((a, b) => (a.pillar === current.pillar ? -1 : b.pillar === current.pillar ? 1 : 0))
    .slice(0, n);
}

export const PILLAR_LABELS: Record<BlogPostPillar, string> = {
  education: "Filter education",
  cost: "Cost and decision",
  local: "Local and seasonal",
};
