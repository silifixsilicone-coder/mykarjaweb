import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const benefits = await prisma.benefit.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(benefits);
  } catch (error) {
    console.error("Error fetching benefits:", error);
    return NextResponse.json(
      { error: "Failed to fetch benefits" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, sortOrder } = body;

    if (!text) {
      return NextResponse.json(
        { error: "Benefit text is required" },
        { status: 400 }
      );
    }

    let calculatedOrder = typeof sortOrder === "number" ? sortOrder : 0;
    if (sortOrder === undefined) {
      const count = await prisma.benefit.count();
      calculatedOrder = count + 1;
    }

    const benefit = await prisma.benefit.create({
      data: {
        text,
        sortOrder: calculatedOrder,
      },
    });

    return NextResponse.json(benefit);
  } catch (error) {
    console.error("Error creating benefit:", error);
    return NextResponse.json(
      { error: "Failed to create benefit" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    if (Array.isArray(body)) {
      const updatedBenefits = await Promise.all(
        body.map((item) => {
          const { id, text, sortOrder } = item;
          if (!id) return Promise.resolve(null);
          return prisma.benefit.update({
            where: { id },
            data: {
              ...(text !== undefined && { text }),
              ...(sortOrder !== undefined && { sortOrder: Number(sortOrder) }),
            },
          });
        })
      );
      return NextResponse.json({ success: true, benefits: updatedBenefits.filter(Boolean) });
    }

    const { id, text, sortOrder } = body;
    if (!id) {
      return NextResponse.json(
        { error: "Benefit ID is required" },
        { status: 400 }
      );
    }

    const updated = await prisma.benefit.update({
      where: { id },
      data: {
        ...(text !== undefined && { text }),
        ...(sortOrder !== undefined && { sortOrder: Number(sortOrder) }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating benefit:", error);
    return NextResponse.json(
      { error: "Failed to update benefit" },
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
        { error: "Benefit ID is required" },
        { status: 400 }
      );
    }

    await prisma.benefit.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Benefit deleted" });
  } catch (error) {
    console.error("Error deleting benefit:", error);
    return NextResponse.json(
      { error: "Failed to delete benefit" },
      { status: 500 }
    );
  }
}
