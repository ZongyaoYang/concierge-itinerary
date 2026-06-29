"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProposalItem } from "@/types";
import ProposalHeader from "@/components/proposal/ProposalHeader";
import ProposalContext from "@/components/proposal/ProposalContext";
import ProposalTimeline from "@/components/proposal/ProposalTimeline";
import ProposalSummary from "@/components/proposal/ProposalSummary";

interface MemberProposal {
    id: string;
    status: string;
    created_at: string;
    items: ProposalItem[];
    reservation: {
        destination: string;
        villa: string;
        arrival_date: string;
        departure_date: string;
        member: { name: string; email: string };
    };
}

export default function MemberProposalView() {
    const params = useParams();
    const id = params.id as string;

    const [proposal, setProposal] = useState<MemberProposal | null>(null);
    const [loading, setLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const fetchProposal = async () => {
            try {
                const res = await fetch(`/api/proposals/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setProposal(data);
                }
            } catch (error) {
                console.error("Failed to fetch proposal:", error);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchProposal();
    }, [id]);

    const updateStatus = async (newStatus: "approved" | "paid") => {
        setIsProcessing(true);
        try {
            const res = await fetch(`/api/proposals/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            if (res.ok) {
                const updated = await res.json();
                setProposal({ ...proposal!, status: updated.status });
            }
        } catch (error) {
            console.error(`Failed to update status to ${newStatus}:`, error);
        } finally {
            setIsProcessing(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <p className="text-stone-500 font-serif animate-pulse tracking-widest uppercase text-sm">Retrieving Itinerary...</p>
            </div>
        );
    }

    if (!proposal) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <p className="text-stone-500 font-serif">Proposal not found or unavailable.</p>
            </div>
        );
    }

    // If the status is 'paid', show the luxurious confirmation screen
    if (proposal.status === "paid") {
        return (
            <div className="min-h-screen bg-stone-900 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-1000">
                <h1 className="text-4xl font-serif text-stone-100 mb-4 tracking-wide">Your Journey Awaits</h1>
                <p className="text-stone-400 max-w-md mx-auto mb-8 font-light">
                    Thank you, {proposal.reservation.member.name}. Your itinerary at {proposal.reservation.villa} is fully confirmed and locked in. We look forward to welcoming you to {proposal.reservation.destination}.
                </p>
                <div className="h-[1px] w-24 bg-stone-700 mb-8 mx-auto"></div>
                <p className="text-stone-500 uppercase tracking-widest text-xs">Exclusive Resorts Concierge</p>
            </div>
        );
    }

    // Helper variables for child components
    const totalCost = proposal.items.reduce((sum, item) => sum + item.price, 0);
    const groupedItems = proposal.items.reduce((acc, item) => {
        const date = new Date(item.scheduled_at).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
        if (!acc[date]) acc[date] = [];
        acc[date].push(item);
        return acc;
    }, {} as Record<string, ProposalItem[]>);

    return (
        <main className="min-h-screen bg-[#FAFAFA] text-stone-900 font-sans selection:bg-stone-200 pb-24">
            <ProposalHeader memberName={proposal.reservation.member.name} />

            <div className="max-w-3xl mx-auto px-6 mt-12">
                <ProposalContext
                    villa={proposal.reservation.villa}
                    destination={proposal.reservation.destination}
                    arrivalDate={proposal.reservation.arrival_date}
                    departureDate={proposal.reservation.departure_date}
                />

                <ProposalTimeline groupedItems={groupedItems} />

                <ProposalSummary
                    totalCost={totalCost}
                    status={proposal.status}
                    isProcessing={isProcessing}
                    updateStatus={updateStatus}
                />
            </div>
        </main>
    );
}