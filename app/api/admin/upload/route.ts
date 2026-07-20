import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { saveImage } from "@/lib/imageStore";

const ALLOWED_TYPES = ["image/webp"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type) || !file.name.toLowerCase().endsWith(".webp")) {
    return NextResponse.json({ error: "Only .webp images are allowed" }, { status: 400 });
  }
  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: "Image must be under 5MB" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const id = await saveImage(buffer, file.type);
  return NextResponse.json({ url: `/api/images/${id}` });
}
