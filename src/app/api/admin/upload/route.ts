import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Limit file size (max 10MB)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds 10MB limit" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename
    const originalName = file.name || "upload.png";
    const extension = (path.extname(originalName) || ".png").toLowerCase();
    const baseName = path
      .basename(originalName, extension)
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .toLowerCase();

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e5)}`;
    const filename = `${baseName}-${uniqueSuffix}${extension}`;

    const fileMimeType = file.type || `image/${extension.replace(".", "")}`;

    try {
      // Target upload directory
      const uploadDir = path.join(process.cwd(), "public", "uploads");

      // Ensure directory exists
      await mkdir(uploadDir, { recursive: true });

      // Write file to local public/uploads directory
      const filePath = path.join(uploadDir, filename);
      await writeFile(filePath, buffer);

      const publicUrl = `/uploads/${filename}`;

      return NextResponse.json({
        url: publicUrl,
        filename,
        size: file.size,
        type: fileMimeType,
        success: true,
      });
    } catch (fsError) {
      console.warn("Local filesystem write failed. Using Data URL fallback:", fsError);
      // Fallback for read-only serverless environments (e.g. Vercel)
      const base64 = buffer.toString("base64");
      const dataUrl = `data:${fileMimeType};base64,${base64}`;

      return NextResponse.json({
        url: dataUrl,
        filename,
        size: file.size,
        type: fileMimeType,
        success: true,
      });
    }
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file. Please try again." },
      { status: 500 }
    );
  }
}
