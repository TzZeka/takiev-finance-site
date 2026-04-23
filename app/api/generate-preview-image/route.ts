import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/lib/sanity/writeClient";
import { generateBlogBanner } from "@/lib/gemini-image";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  let title: string;
  let extraPrompt: string | undefined;

  try {
    const body = await req.json();
    title = body.title;
    extraPrompt = body.extraPrompt;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!title?.trim()) {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }

  try {
    const { data, mimeType } = await generateBlogBanner(title, "", [], extraPrompt);

    const ext = mimeType.includes("jpeg") ? "jpg" : "png";
    const filename = `blog-preview-${Date.now()}.${ext}`;

    const asset = await writeClient.assets.upload("image", data, {
      filename,
      contentType: mimeType,
    });

    return NextResponse.json({
      assetId: asset._id,
      previewUrl: asset.url,
    });
  } catch (err) {
    console.error("[Preview Banner] Failed:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
