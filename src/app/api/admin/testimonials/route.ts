import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, photo, text, language, sortOrder } = body;

    if (!name || !text) {
      return NextResponse.json(
        { error: "Name and text are required" },
        { status: 400 }
      );
    }

    let calculatedOrder = typeof sortOrder === "number" ? sortOrder : 0;
    if (sortOrder === undefined) {
      const count = await prisma.testimonial.count();
      calculatedOrder = count + 1;
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        photo: photo || "",
        text,
        language: language || "मराठी",
        sortOrder: calculatedOrder,
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    if (Array.isArray(body)) {
      const updatedList = await Promise.all(
        body.map((item) => {
          const { id, ...data } = item;
          if (!id) return Promise.resolve(null);
          return prisma.testimonial.update({
            where: { id },
            data: {
              ...(data.name !== undefined && { name: data.name }),
              ...(data.photo !== undefined && { photo: data.photo }),
              ...(data.text !== undefined && { text: data.text }),
              ...(data.language !== undefined && { language: data.language }),
              ...(data.sortOrder !== undefined && { sortOrder: Number(data.sortOrder) }),
            },
          });
        })
      );
      return NextResponse.json({ success: true, testimonials: updatedList.filter(Boolean) });
    }

    const { id, name, photo, text, language, sortOrder } = body;
    if (!id) {
      return NextResponse.json(
        { error: "Testimonial ID is required" },
        { status: 400 }
      );
    }

    const updated = await prisma.testimonial.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(photo !== undefined && { photo }),
        ...(text !== undefined && { text }),
        ...(language !== undefined && { language }),
        ...(sortOrder !== undefined && { sortOrder: Number(sortOrder) }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json(
      { error: "Failed to update testimonial" },
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
        { error: "Testimonial ID is required" },
        { status: 400 }
      );
    }

    await prisma.testimonial.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Testimonial deleted" });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json(
      { error: "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}
