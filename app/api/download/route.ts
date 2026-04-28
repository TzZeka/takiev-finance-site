import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  const name = request.nextUrl.searchParams.get("name") ?? "document.pdf";

  if (!url) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  // Only allow Sanity CDN file URLs
  if (!url.startsWith("https://cdn.sanity.io/files/")) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return new NextResponse("Failed to fetch file", { status: response.status });
    }

    const buffer = await response.arrayBuffer();
    const contentType =
      response.headers.get("Content-Type") ?? "application/octet-stream";

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(name)}`,
        "Content-Length": String(buffer.byteLength),
      },
    });
  } catch {
    return new NextResponse("Download failed", { status: 500 });
  }
}
