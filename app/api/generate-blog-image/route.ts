import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/lib/sanity/writeClient";
import { generateBlogBanner } from "@/lib/gemini-image";

// Allow up to 60 s — image generation + Sanity upload takes a few seconds
export const maxDuration = 60;

interface WebhookBody {
  _id: string;
  _type: string;
  title?: string;
  excerpt?: string;
  tags?: string[];
  slug?: { current: string };
  mainImage?: { asset?: { _ref?: string } };
}

function verifySignature(rawBody: string, header: string, secret: string): boolean {
  try {
    const parts = Object.fromEntries(
      header.split(",").map((seg) => {
        const idx = seg.indexOf("=");
        return [seg.slice(0, idx), seg.slice(idx + 1)];
      })
    );
    const { t, v1 } = parts;
    if (!t || !v1) return false;

    const hmac = createHmac("sha256", secret);
    hmac.update(`${t}.${rawBody}`);
    const expectedHex = hmac.digest("hex");
    const expectedBuf = Buffer.from(expectedHex, "hex");
    const actualBuf = Buffer.from(v1, "hex");

    // Buffers must be same length for timingSafeEqual
    if (expectedBuf.length !== actualBuf.length) return false;
    return timingSafeEqual(expectedBuf, actualBuf);
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();

  // Verify webhook signature if secret is configured
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  if (secret) {
    const sig = req.headers.get("sanity-webhook-signature") ?? "";
    if (!verifySignature(rawBody, sig, secret)) {
      console.warn("[AI Banner] Invalid webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  let body: WebhookBody;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { _id, _type, title, excerpt, tags, slug, mainImage } = body;

  // Only handle blog posts
  if (_type !== "blogPost") {
    return NextResponse.json({ skipped: "not a blogPost" });
  }

  // Skip if a mainImage is already set — respect manual uploads
  if (mainImage?.asset?._ref) {
    return NextResponse.json({ skipped: "mainImage already set" });
  }

  if (!title) {
    return NextResponse.json({ skipped: "no title" });
  }

  try {
    console.log(`[AI Banner] Generating for: "${title}"`);

    const { data: imageBuffer, mimeType } = await generateBlogBanner(
      title,
      excerpt ?? "",
      tags ?? []
    );

    const ext = mimeType.includes("jpeg") ? "jpg" : "png";
    const filename = `blog-banner-${slug?.current ?? _id}.${ext}`;

    // Upload image to Sanity CDN
    const asset = await writeClient.assets.upload("image", imageBuffer, {
      filename,
      contentType: mimeType,
    });

    // Patch the document with the new image + alt text
    await writeClient
      .patch(_id)
      .set({
        mainImage: {
          _type: "image",
          asset: { _type: "reference", _ref: asset._id },
          alt: `${title} — Takiev Finance`,
        },
      })
      .commit();

    console.log(`[AI Banner] Done — asset: ${asset._id}`);
    return NextResponse.json({ success: true, assetId: asset._id });
  } catch (err) {
    // Return 200 so Sanity doesn't keep retrying; error is logged server-side
    console.error("[AI Banner] Failed:", err);
    return NextResponse.json({ error: String(err) }, { status: 200 });
  }
}
