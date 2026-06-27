import { NextResponse } from "next/server";
import { db } from "@/lib/db";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/proposals/[id] - Fetch a specific proposal with all its details
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const proposal = await db.proposal.findUnique({
      where: { id },
      include: {
        items: true,
        reservation: { include: { member: true } },
      },
    });

    if (!proposal) {
      return NextResponse.json(
        { error: "Proposal not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(proposal);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// PATCH /api/proposals/[id] - Update state (approved, paid)
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const updatedProposal = await db.proposal.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedProposal);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
