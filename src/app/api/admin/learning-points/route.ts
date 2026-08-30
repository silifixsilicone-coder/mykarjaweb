import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const learningPoints = await prisma.learningPoint.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(learningPoints);
  } catch (error) {
    console.error("Error fetching learning points:", error);
    return NextResponse.json(
      { error: "Failed to fetch learning points" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { number, title, description, sortOrder } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    // Auto-compute sort order if not provided
    let calculatedOrder = typeof sortOrder === "number" ? sortOrder : 0;
    if (sortOrder === undefined) {
      const count = await prisma.learningPoint.count();
      calculatedOrder = count + 1;
    }

    const point = await prisma.learningPoint.create({
      data: {
        number: number || String(calculatedOrder).padStart(2, "0"),
        title,
        description: description || "",
        sortOrder: calculatedOrder,
      },
    });

    return NextResponse.json(point);
  } catch (error) {
    console.error("Error creating learning point:", error);
    return NextResponse.json(
      { error: "Failed to create learning point" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if batch update
    if (Array.isArray(body)) {
      const updatedPoints = await Promise.all(
        body.map((item) => {
          const { id, ...data } = item;
          if (!id) return Promise.resolve(null);
          return prisma.learningPoint.update({
            where: { id },
            data: {
              ...(data.number !== undefined && { number: data.number }),
              ...(data.title !== undefined && { title: data.title }),
              ...(data.description !== undefined && { description: data.description }),
              ...(data.sortOrder !== undefined && { sortOrder: Number(data.sortOrder) }),
            },
          });
        })
      );
      return NextResponse.json({ success: true, learningPoints: updatedPoints.filter(Boolean) });
    }

    const { id, number, title, description, sortOrder } = body;
    if (!id) {
      return NextResponse.json(
        { error: "Learning point ID is required" },
        { status: 400 }
      );
    }

    const updated = await prisma.learningPoint.update({
      where: { id },
      data: {
        ...(number !== undefined && { number }),
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(sortOrder !== undefined && { sortOrder: Number(sortOrder) }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating learning point:", error);
    return NextResponse.json(
      { error: "Failed to update learning point" },
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
        { error: "Learning point ID is required" },
        { status: 400 }
      );
    }

    await prisma.learningPoint.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Learning point deleted" });
  } catch (error) {
    console.error("Error deleting learning point:", error);
    return NextResponse.json(
      { error: "Failed to delete learning point" },
      { status: 500 }
    );
  }
}
