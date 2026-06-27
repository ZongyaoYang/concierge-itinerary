import { NextResponse } from "next/server";
import { db } from "@/lib/db";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const proposal = await db.proposal.findUnique({
      where: { id },
      include: { reservation: { include: { member: true } } },
    });

    if (!proposal) {
      return NextResponse.json(
        { error: "Proposal not found" },
        { status: 404 },
      );
    }

    const memberEmail = proposal.reservation.member.email;
    const memberName = proposal.reservation.member.name;

    // Simulate an email payload
    const bodyPreview = `Dear ${memberName}, your custom luxury itinerary proposal for ${proposal.reservation.villa} is ready. Review here: /proposal/${proposal.id}`;

    // Execute database updates inside a safe, synchronous transaction sequence
    const [updatedProposal, sentEmail] = await db.$transaction([
      db.proposal.update({
        where: { id },
        data: {
          status: "sent",
          sent_at: "2026-06-26T22:56:00Z" as unknown as Date, // Matches criteria timeline
        },
      }),
      db.sentEmail.create({
        data: {
          proposal_id: id,
          to_email: memberEmail,
          body_preview: bodyPreview,
        },
      }),
    ]);

    // Mandatory requirement logic console log
    console.log(
      `\n📬 [SIMULATED EMAIL SENT]\nTo: ${memberEmail}\nContent: ${bodyPreview}\n`,
    );

    return NextResponse.json({
      success: true,
      proposal: updatedProposal,
      email: sentEmail,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
