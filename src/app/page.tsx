"use client";

import { useState, useEffect } from "react";
import { Reservation, Proposal } from "@/types";
import Header from "@/components/Header";
import ItineraryBuilder from "@/components/ItineraryBuilder";
import ProposalHistory from "@/components/ProposalHistory";

export default function ConciergeDashboard() {
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const resData = await fetch("/api/reservations").then((res) => res.json());
      setReservation(resData);

      const propData = await fetch("/api/proposals").then((res) => res.json());
      setProposals(propData);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div className="p-10 text-center text-gray-500">Loading Dashboard...</div>;
  if (!reservation) return <div className="p-10 text-center text-red-500">No reservation found. Did you seed the database?</div>;

  return (
    <main className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        <Header reservation={reservation} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ItineraryBuilder reservationId={reservation.id} refreshData={fetchData} />
          <ProposalHistory proposals={proposals} refreshData={fetchData} />
        </div>
      </div>
    </main>
  );
}