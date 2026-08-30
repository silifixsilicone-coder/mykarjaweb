import { NextRequest, NextResponse } from "next/server";
import { getFaqItems, saveFaqItem, deleteFaqItem } from "@/lib/firestoreDb";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const faqs = await getFaqItems();
    return NextResponse.json(faqs);
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return NextResponse.json(
      { error: "Failed to fetch FAQ items" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, answer, sortOrder } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { error: "Question and answer are required" },
        { status: 400 }
      );
    }

    const item = await saveFaqItem({ question, answer, sortOrder });
    return NextResponse.json(item);
  } catch (error) {
    console.error("Error creating FAQ:", error);
    return NextResponse.json(
      { error: "Failed to create FAQ item" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    if (Array.isArray(body)) {
      for (const item of body) {
        if (item.id) {
          await saveFaqItem(item);
        }
      }
      const updated = await getFaqItems();
      return NextResponse.json({ success: true, faqItems: updated });
    }

    const { id, question, answer, sortOrder } = body;
    if (!id) {
      return NextResponse.json(
        { error: "FAQ item ID is required" },
        { status: 400 }
      );
    }

    const updated = await saveFaqItem({ id, question, answer, sortOrder });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating FAQ:", error);
    return NextResponse.json(
      { error: "Failed to update FAQ item" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    let id = searchParams.get("id");

    if (!id) {
      const body = await request.json().catch(() => ({}));
      id = body.id;
    }

    if (!id) {
      return NextResponse.json(
        { error: "FAQ item ID is required" },
        { status: 400 }
      );
    }

    await deleteFaqItem(id);
    return NextResponse.json({ success: true, message: "FAQ item deleted" });
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    return NextResponse.json(
      { error: "Failed to delete FAQ item" },
      { status: 500 }
    );
  }
}
