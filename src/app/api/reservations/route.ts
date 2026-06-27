import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const reservation = await db.reservation.findFirst({
      include: { member: true },
    });

    if (!reservation) {
      return NextResponse.json(
        { error: "No reservations found" },
        { status: 404 },
      );
    }

    return NextResponse.json(reservation);
  } catch (error) {
    console.error("Failed to fetch reservation: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
