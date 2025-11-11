import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const slugRaw = searchParams.get("slug");

    if (!slugRaw || typeof slugRaw !== "string") {
      return NextResponse.json(
        { error: "Missing 'slug' query parameter" },
        { status: 400 }
      );
    }

    const slug = slugRaw.trim().toLowerCase();
    const valid = /^[a-z0-9-]{3,50}$/.test(slug);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid slug format" },
        { status: 400 }
      );
    }

    // Check if the file exists
    const filePath = path.join(process.cwd(), ".data", "sites", `${slug}.html`);
    
    try {
      await fs.access(filePath);
      // File exists, URL is taken
      return NextResponse.json({ available: false, slug });
    } catch {
      // File doesn't exist, URL is available
      return NextResponse.json({ available: true, slug });
    }
  } catch (error) {
    console.error("/api/check-url error", error);
    return NextResponse.json(
      { error: "Failed to check URL availability" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";

