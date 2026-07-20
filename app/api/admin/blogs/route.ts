import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createPost, getAllPosts } from "@/lib/blogStore";
import { validateBlogPostInput } from "@/lib/validateBlogPost";

export async function GET() {
  const posts = await getAllPosts();
  return NextResponse.json({ posts });
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = validateBlogPostInput(body);
  if ("error" in result) return NextResponse.json({ error: result.error }, { status: 400 });

  try {
    const post = await createPost(result.post);
    return NextResponse.json({ post }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 409 });
  }
}
