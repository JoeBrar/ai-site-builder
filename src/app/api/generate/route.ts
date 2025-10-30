import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const prompt: unknown = (body as { prompt?: unknown })?.prompt;
    const slugRaw: unknown = (body as { slug?: unknown })?.slug;

    if (typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "Missing or invalid 'prompt' in request body" },
        { status: 400 }
      );
    }

    const slug = typeof slugRaw === "string" ? slugRaw.trim().toLowerCase() : "";
    const valid = /^[a-z0-9-]{3,50}$/.test(slug);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid 'slug'. Use 3-50 chars: lowercase letters, numbers, and hyphens only." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server misconfiguration: GOOGLE_API_KEY is not set" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenAI({apiKey: apiKey});
    //const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const instruction = [
      "You build complete, production-quality, single-file websites.",
      "Output strictly one complete HTML5 document with inline <style> and inline <script> only.",
      "Do not output Markdown, backticks, or explanations.",
      "Ensure accessibility, responsive layout, and pleasant styling.",
      "Make sure the website is mobile-friendly and responsive for mobile devices. If there are some controls then the controls should be appropriately adopted to mobile devices such as using touch controls.",
      "Keep external calls out; everything must work offline in a single file.",
      "Make the website look beautiful and professional."
    ].join(" \n");

    const userTask = `User request: ${prompt}`;
    const fullPrompt = `${instruction}\n\n${userTask}\n\nReturn ONLY the HTML document.`;

    //const result = await model.generateContent(fullPrompt);
    const result = await genAI.models.generateContent({model: "gemini-2.5-flash", contents: fullPrompt});
    const text = result.text

    // In case the model wraps code in markdown fences, strip them.
    const cleaned = text ? text
      .replace(/^```(?:html)?\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim() : '';

    console.log("cleaned data from AI - ",cleaned)
    
    // Very basic guard: ensure it looks like an HTML document
    const html = /<html[\s\S]*<\/html>/i.test(cleaned) ? cleaned : `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8" />\n<meta name="viewport" content="width=device-width, initial-scale=1" />\n<title>Generated Site</title>\n<style>body{font-family:system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; padding:24px; max-width:960px; margin:0 auto;}</style>\n</head>\n<body>\n<main>\n<h1>Website generation incomplete</h1>\n<p>The AI returned content that did not look like a full HTML document.</p>\n<pre style="white-space:pre-wrap; background:#f6f8fa; padding:12px; border-radius:8px;">${cleaned.replace(/[<&>]/g, (c) => ({"<":"&lt;","&":"&amp;",">":"&gt;"}[c] as string))}</pre>\n</main>\n</body>\n</html>`;
    console.log("html data from AI - ",html)

    // Persist to .data/sites/{slug}.html
    const dataDir = path.join(process.cwd(), ".data", "sites");
    const targetFile = path.join(dataDir, `${slug}.html`);
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(targetFile, html, "utf8");

    return NextResponse.json({ html, path: `/${slug}` });
  } catch (error) {
    console.error("/api/generate error", error);
    return NextResponse.json(
      { error: "Failed to generate website. Please try again." },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic"; // avoid any static caching for this route


