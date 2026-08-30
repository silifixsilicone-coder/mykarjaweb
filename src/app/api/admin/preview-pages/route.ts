import { NextRequest, NextResponse } from "next/server";
import { getPreviewPages, savePreviewPages } from "@/lib/firestoreDb";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const previewPages = await getPreviewPages();
    return NextResponse.json(previewPages);
  } catch (error) {
    console.error("Error fetching preview pages:", error);
    return NextResponse.json(
      { error: "Failed to fetch preview pages" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    if (Array.isArray(body)) {
      await savePreviewPages(body);
      const updated = await getPreviewPages();
      return NextResponse.json({ success: true, previewPages: updated });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating preview pages:", error);
    return NextResponse.json(
      { error: "Failed to update preview pages" },
      { status: 500 }
    );
  }
}
