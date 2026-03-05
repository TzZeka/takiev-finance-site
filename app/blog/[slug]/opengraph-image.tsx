import { ImageResponse } from "next/og";
import { getBlogPostBySlug } from "@/lib/sanity/queries";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  const title = post?.title ?? "Блог — Takiev Finance";
  const excerpt = post?.excerpt ?? "Счетоводни и данъчни услуги в София";
  const authorName = post?.author?.name ?? "Takiev Finance";

  // Dynamic font size: smaller title → larger text, longer title → smaller text
  const titleFontSize = title.length > 80 ? 40 : title.length > 55 ? 48 : 56;

  // Truncate excerpt
  const shortExcerpt =
    excerpt.length > 130 ? excerpt.substring(0, 130) + "…" : excerpt;

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(140deg, #06100e 0%, #0b1f1c 55%, #041510 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "56px 72px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Teal radial glow — top right */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle, rgba(25,191,183,0.18) 0%, transparent 65%)",
          }}
        />
        {/* Teal radial glow — bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -60,
            width: 360,
            height: 360,
            background:
              "radial-gradient(circle, rgba(25,191,183,0.10) 0%, transparent 65%)",
          }}
        />

        {/* ── Top bar: logo + domain ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          {/* Brick icon — 3 top + 1 centred below (matches site logo) */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            <div style={{ display: "flex", gap: 5 }}>
              <div
                style={{
                  width: 17,
                  height: 13,
                  background: "#19BFB7",
                  borderRadius: 3,
                }}
              />
              <div
                style={{
                  width: 17,
                  height: 13,
                  background: "#19BFB7",
                  borderRadius: 3,
                }}
              />
              <div
                style={{
                  width: 17,
                  height: 13,
                  background: "#19BFB7",
                  borderRadius: 3,
                }}
              />
            </div>
            <div style={{ display: "flex", paddingLeft: 11 }}>
              <div
                style={{
                  width: 17,
                  height: 13,
                  background: "#19BFB7",
                  borderRadius: 3,
                }}
              />
            </div>
          </div>

          <span
            style={{
              color: "#19BFB7",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: -0.5,
            }}
          >
            Takiev Finance
          </span>

          <div
            style={{
              width: 1,
              height: 22,
              background: "rgba(255,255,255,0.18)",
              marginLeft: 8,
            }}
          />

          <span
            style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: 20,
            }}
          >
            takiev.bg
          </span>
        </div>

        {/* ── Middle: accent line + title + excerpt ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            gap: 20,
            marginTop: 32,
          }}
        >
          {/* Teal accent bar */}
          <div
            style={{
              width: 56,
              height: 4,
              background: "#19BFB7",
              borderRadius: 2,
            }}
          />

          {/* Post title */}
          <div
            style={{
              color: "#ffffff",
              fontSize: titleFontSize,
              fontWeight: 800,
              lineHeight: 1.18,
              letterSpacing: -0.8,
              maxWidth: 1050,
            }}
          >
            {title}
          </div>

          {/* Excerpt */}
          <div
            style={{
              color: "rgba(255,255,255,0.52)",
              fontSize: 21,
              lineHeight: 1.55,
              maxWidth: 820,
            }}
          >
            {shortExcerpt}
          </div>
        </div>

        {/* ── Bottom row: author + CTA button ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 44,
          }}
        >
          {/* Author */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span
              style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: 13,
                letterSpacing: 2.5,
                textTransform: "uppercase",
              }}
            >
              Автор
            </span>
            <span
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: 22,
                fontWeight: 600,
              }}
            >
              {authorName}
            </span>
          </div>

          {/* CTA pill */}
          <div
            style={{
              background: "#19BFB7",
              color: "#06100e",
              padding: "14px 30px",
              borderRadius: 10,
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 0.3,
            }}
          >
            Прочети статията →
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
