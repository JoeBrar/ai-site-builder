import { promises as fs } from "fs";
import path from "path";
import type { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug: slugFromParams } = await params;
  const slugRaw = slugFromParams ?? "";
  const slug = String(slugRaw).trim().toLowerCase();
  const valid = /^[a-z0-9-]{3,50}$/.test(slug);
  if (!valid) {
    return new Response("Invalid slug", { status: 400 });
  }

  try {
    const filePath = path.join(process.cwd(), ".data", "sites", `${slug}.html`);
    const html = await fs.readFile(filePath, "utf8");
    return new Response(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}

export const dynamic = "force-dynamic";


