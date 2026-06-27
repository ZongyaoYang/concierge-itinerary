import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const proposals = await db.proposal.findMany({
      include: {
        items: true,
        reservation: { include: { member: true } },
      },
      orderBy: { create_at: "desc" },
    });
    return NextResponse.json(proposals);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { reservation_id, items } = body;

    if (!reservation_id || !Array.isArray(items)) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 404 },
      );
    }

    const proposal = await db.proposal.create({
      data: {
        reservation_id,
        status: "draft",
        items: {
          create: items.map((item) => ({
            category: item.category,
            title: item.title,
            description: item.description,
            scheduled_at: item.scheduled_at as unknown as Date,
            price: parseFloat(item.price),
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json(proposal, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
