"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProposalItem } from "@/types";
import ProposalHeader from "@/components/proposal/ProposalHeader";
import ProposalContext from "@/components/proposal/ProposalContext";
import ProposalTimeline from "@/components/proposal/ProposalTimeline";
import ProposalSummary from "@/components/proposal/ProposalSummary";
import { ProposalStatus } from "@prisma/client";

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

    const updateStatus = async (newStatus: ProposalStatus) => {
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

    // 1. Move calculations up so they are available for both views
    const totalCost = proposal.items.reduce((sum, item) => sum + item.price, 0);
    const groupedItems = proposal.items.reduce((acc, item) => {
        const date = new Date(item.scheduled_at).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
        if (!acc[date]) acc[date] = [];
        acc[date].push(item);
        return acc;
    }, {} as Record<string, ProposalItem[]>);

    // 2. Updated Luxury PAID view
    if (proposal.status === ProposalStatus.PAID) {
        return (
            <div className="min-h-screen bg-stone-900 p-6 md:p-12 text-stone-300 font-sans animate-in fade-in duration-1000 flex flex-col items-center">
                <div className="max-w-3xl w-full">
                    {/* Hero Message */}
                    <div className="text-center mb-16 mt-10">
                        <h1 className="text-4xl md:text-5xl font-serif text-stone-100 mb-6 tracking-wide">Your Journey Awaits</h1>
                        <p className="text-stone-400 max-w-xl mx-auto mb-8 font-light leading-relaxed">
                            Thank you, {proposal.reservation.member.name}. Your proposal is paid and your itinerary at {proposal.reservation.villa} is fully confirmed. Our concierge team is preparing your services now. We look forward to welcoming you to {proposal.reservation.destination}.
                        </p>
                        <p className="text-stone-500 uppercase tracking-widest text-xs">Exclusive Resorts Concierge</p>
                    </div>

                    <div className="h-[1px] w-full bg-stone-800 mb-16"></div>

                    {/* Detailed Itinerary */}
                    <div className="space-y-12 mb-20">
                        <h2 className="text-2xl font-serif text-stone-200 text-center mb-12 tracking-wide">Confirmed Itinerary</h2>

                        {Object.entries(groupedItems).map(([date, items]) => (
                            <div key={date} className="relative">
                                {/* Elegant Date Header */}
                                <h3 className="text-lg font-serif text-stone-100 border-b border-stone-800 pb-3 mb-6 tracking-wide">
                                    {date}
                                </h3>

                                {/* Item List */}
                                <div className="space-y-8">
                                    {items.map((item, idx) => (
                                        <div key={idx} className="pl-0 md:pl-4 group">
                                            <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                                                <div>
                                                    <span className="text-[10px] uppercase tracking-widest text-stone-500 block mb-1">
                                                        {item.category} • {new Date(item.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                    <h4 className="text-stone-200 font-medium text-lg">{item.title}</h4>
                                                </div>
                                                <span className="text-stone-400 font-serif mt-1 md:mt-0">
                                                    ${item.price.toFixed(2)}
                                                </span>
                                            </div>
                                            {item.description && (
                                                <p className="text-stone-400 text-sm font-light leading-relaxed max-w-2xl italic">
                                                    "{item.description}"
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Grand Total */}
                    <div className="border-t border-stone-800 pt-8 pb-12 text-right">
                        <p className="text-stone-500 uppercase tracking-widest text-xs mb-2">Total Processed</p>
                        <p className="text-3xl font-serif text-stone-200 tracking-wide">${totalCost.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        );
    }

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