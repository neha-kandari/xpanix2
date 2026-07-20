import { getDb } from "@/lib/mongodb";
import type { BlogPost } from "@/components/blogsData";
import seedPosts from "@/data/blog-posts.seed.json";

const COLLECTION = "posts";

type StoredPost = BlogPost & { publishedAt: number };

let seeded: Promise<void> | null = null;

async function getCollection() {
  const db = await getDb();
  return db.collection<StoredPost>(COLLECTION);
}

async function ensureSeeded() {
  if (!seeded) {
    seeded = (async () => {
      const collection = await getCollection();
      await collection.createIndex({ slug: 1 }, { unique: true });
      const count = await collection.estimatedDocumentCount();
      if (count === 0) {
        const seed = seedPosts as unknown as BlogPost[];
        const now = Date.now();
        const docs: StoredPost[] = seed.map((post, i) => ({ ...post, publishedAt: now - i }));
        if (docs.length) await collection.insertMany(docs);
      }
    })();
  }
  await seeded;
}

function stripInternal(doc: StoredPost): BlogPost {
  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    category: doc.category,
    date: doc.date,
    readTime: doc.readTime,
    img: doc.img,
    content: doc.content,
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  await ensureSeeded();
  const collection = await getCollection();
  const docs = await collection
    .find({}, { projection: { _id: 0 } })
    .sort({ publishedAt: -1 })
    .toArray();
  return (docs as StoredPost[]).map(stripInternal);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  await ensureSeeded();
  const collection = await getCollection();
  const doc = await collection.findOne({ slug }, { projection: { _id: 0 } });
  return doc ? stripInternal(doc as StoredPost) : null;
}

export async function createPost(post: BlogPost): Promise<BlogPost> {
  await ensureSeeded();
  const collection = await getCollection();
  const existing = await collection.findOne({ slug: post.slug });
  if (existing) throw new Error(`A post with slug "${post.slug}" already exists`);
  const doc: StoredPost = { ...post, publishedAt: Date.now() };
  await collection.insertOne(doc);
  return post;
}

export async function updatePost(currentSlug: string, updates: BlogPost): Promise<BlogPost> {
  await ensureSeeded();
  const collection = await getCollection();
  const existing = await collection.findOne({ slug: currentSlug });
  if (!existing) throw new Error(`No post found with slug "${currentSlug}"`);
  if (updates.slug !== currentSlug) {
    const clash = await collection.findOne({ slug: updates.slug });
    if (clash) throw new Error(`A post with slug "${updates.slug}" already exists`);
  }
  const doc: StoredPost = { ...updates, publishedAt: existing.publishedAt };
  await collection.replaceOne({ slug: currentSlug }, doc);
  return updates;
}

export async function deletePost(slug: string): Promise<void> {
  await ensureSeeded();
  const collection = await getCollection();
  const result = await collection.deleteOne({ slug });
  if (result.deletedCount === 0) throw new Error(`No post found with slug "${slug}"`);
}
