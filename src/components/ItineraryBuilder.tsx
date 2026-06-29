"use client";

import { useState } from "react";
import { ProposalItem } from "@/types";
import ItineraryForm from "./ItineraryForm";
import DraftPreview from "./DraftPreview";

interface Props {
    reservationId: string;
    refreshData: () => void;
}

export default function ItineraryBuilder({ reservationId, refreshData }: Props) {
    const [draftItems, setDraftItems] = useState<ProposalItem[]>([]);
    const [newItem, setNewItem] = useState<ProposalItem>({
        category: "Dining",
        title: "",
        description: "",
        scheduled_at: "",
        price: 0,
    });

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        setDraftItems([...draftItems, { ...newItem, price: Number(newItem.price) }]);
        setNewItem({ category: "Dining", title: "", description: "", scheduled_at: "", price: 0 });
    };

    // ADDED: The removal function
    const removeDraftItem = (indexToRemove: number) => {
        setDraftItems(draftItems.filter((_, index) => index !== indexToRemove));
    };

    const handleCreateProposal = async () => {
        if (draftItems.length === 0) return;

        await fetch("/api/proposals", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                reservation_id: reservationId,
                items: draftItems,
            }),
        });

        setDraftItems([]);
        refreshData();
    };

    return (
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Build Proposal</h2>

            <ItineraryForm
                newItem={newItem}
                setNewItem={setNewItem}
                handleAddItem={handleAddItem}
            />

            <DraftPreview
                draftItems={draftItems}
                handleCreateProposal={handleCreateProposal}
                onRemove={removeDraftItem} // PASSED: New prop
            />
        </section>
    );
}