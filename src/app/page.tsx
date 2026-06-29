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

  const deleteProposal = async (id: string) => {
    if (!confirm("Are you sure you want to delete this proposal?")) return;

    try {
      const res = await fetch(`/api/proposals/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Re-fetch data from the database to update the UI
        fetchData();
      } else {
        alert("Failed to delete proposal.");
      }
    } catch (error) {
      console.error("Delete request failed:", error);
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
          <ItineraryBuilder
            reservationId={reservation.id}
            arrivalDate={new Date(reservation.arrival_date)}
            departureDate={new Date(reservation.departure_date)}
            refreshData={fetchData}
          />
          <ProposalHistory proposals={proposals} refreshData={fetchData} onDelete={deleteProposal} />
        </div>
      </div>
    </main>
  );
}