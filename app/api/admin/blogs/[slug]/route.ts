import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { deletePost, getPostBySlug, updatePost } from "@/lib/blogStore";
import { validateBlogPostInput } from "@/lib/validateBlogPost";

type Context = { params: Promise<{ slug: string }> };

export async function GET(_request: NextRequest, { params }: Context) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ post });
}

export async function PUT(request: NextRequest, { params }: Context) {
  const { slug } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = validateBlogPostInput(body);
  if ("error" in result) return NextResponse.json({ error: result.error }, { status: 400 });

  try {
    const post = await updatePost(slug, result.post);
    return NextResponse.json({ post });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 409 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Context) {
  const { slug } = await params;
  try {
    await deletePost(slug);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 404 });
  }
}
