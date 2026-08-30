import { NextRequest, NextResponse } from "next/server";
import { getEditions, saveEdition } from "@/lib/firestoreDb";
import { validateUrl } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const editions = await getEditions();
    return NextResponse.json(editions);
  } catch (error) {
    console.error("Failed to fetch editions:", error);
    return NextResponse.json(
      { error: "Failed to fetch editions" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    if (Array.isArray(body)) {
      for (const item of body) {
        if (item.paymentUrl && !validateUrl(item.paymentUrl)) {
          return NextResponse.json(
            { error: `Invalid payment URL for "${item.name || item.id}". Must start with http:// or https://` },
            { status: 400 }
          );
        }
      }

      for (const item of body) {
        if (item.id) {
          await saveEdition(item);
        }
      }

      const updated = await getEditions();
      return NextResponse.json({ success: true, editions: updated });
    }

    const { id, ...data } = body;
    if (!id) {
      return NextResponse.json({ error: "Edition ID is required" }, { status: 400 });
    }

    if (data.paymentUrl && !validateUrl(data.paymentUrl)) {
      return NextResponse.json({ error: `Invalid payment URL` }, { status: 400 });
    }

    await saveEdition({ id, ...data });
    const updated = await getEditions();
    return NextResponse.json(updated.find((e) => e.id === id) || { id, ...data });
  } catch (error) {
    console.error("Failed to update edition:", error);
    return NextResponse.json({ error: "Failed to update edition" }, { status: 500 });
  }
}
