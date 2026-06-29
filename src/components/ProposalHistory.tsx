"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Proposal } from "@/types";
import { ProposalStatus } from "@prisma/client";
import { format } from "date-fns";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
    proposals: Proposal[];
    refreshData: () => void;
    onDelete: (id: string) => void;
}

export default function ProposalHistory({ proposals, refreshData, onDelete }: Props) {
    const [openItems, setOpenItems] = useState<string[]>([]);

    const toggleAll = () => {
        if (openItems.length === proposals.length) {
            setOpenItems([]); // Collapse all
        } else {
            setOpenItems(proposals.map(p => p.id)); // Expand all
        }
    };

    const handleSendProposal = async (id: string) => {
        await fetch(`/api/proposals/${id}/send`, { method: "POST" });
        refreshData();
    };

    return (
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 overflow-y-auto max-h-[800px]">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Proposal History</h2>
                {proposals.length > 0 && (
                    <button
                        onClick={toggleAll}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                        {openItems.length === proposals.length ? "Collapse All" : "View All"}
                    </button>
                )}
            </div>

            {proposals.length === 0 ? (
                <p className="text-sm text-gray-500">No proposals created yet.</p>
            ) : (
                <Accordion type="multiple" value={openItems} onValueChange={setOpenItems} className="space-y-4">
                    {proposals.map((proposal) => (
                        <AccordionItem key={proposal.id} value={proposal.id} className="border border-gray-200 rounded-md px-4">
                            <AccordionTrigger className="hover:no-underline py-4">
                                <div className="flex justify-between items-center w-full pr-4">
                                    <span className="text-xs text-gray-500">ID: {proposal.id.slice(0, 8)}...</span>
                                    <div className="flex items-center gap-2">
                                        {proposal.status === ProposalStatus.DRAFT && (
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    onDelete(proposal.id);
                                                }}
                                                className="cursor-pointer text-gray-400 hover:text-red-600 transition p-1"
                                                title="Delete Proposal"
                                            >
                                                <Trash2 size={16} />
                                            </div>
                                        )}
                                        <span className={`px-2 py-1 text-xs rounded-full font-medium uppercase
                                          ${proposal.status === ProposalStatus.DRAFT ? 'bg-gray-100 text-gray-600' :
                                                proposal.status === ProposalStatus.SENT ? 'bg-blue-100 text-blue-600' :
                                                    proposal.status === ProposalStatus.APPROVED ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-green-100 text-green-700'}`}>
                                            {proposal.status}
                                        </span>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4 pb-4">
                                    <p className="text-sm text-gray-800 font-medium">{proposal.items.length} Itinerary Items</p>

                                    {proposal.items.map((item, idx) => (
                                        <div key={idx} className="bg-gray-50 p-3 rounded border border-gray-100 text-sm">
                                            <div className="flex justify-between font-medium mb-1">
                                                <span>{item.title}</span>
                                                <span>${item.price.toFixed(2)}</span>
                                            </div>
                                            <div className="text-xs text-gray-500 space-y-0.5">
                                                <p>Category: {item.category}</p>
                                                <p>Date: {format(new Date(item.scheduled_at), "PPP p")}</p>
                                                {item.description && <p className="mt-1 italic">{item.description}</p>}
                                            </div>
                                        </div>
                                    ))}

                                    <div className="border-t pt-2 font-bold text-sm text-right">
                                        Total: ${proposal.items.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                                    </div>

                                    <div className="flex space-x-2 pt-2">
                                        {proposal.status === ProposalStatus.DRAFT && (
                                            <button
                                                onClick={() => handleSendProposal(proposal.id)}
                                                className="flex-1 bg-blue-600 text-white text-xs py-2 rounded transition hover:bg-blue-700"
                                            >
                                                Send to Member
                                            </button>
                                        )}
                                        <a
                                            href={`/proposal/${proposal.id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 block text-center bg-gray-100 text-gray-800 text-xs py-2 rounded transition hover:bg-gray-200"
                                        >
                                            Preview Member View
                                        </a>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            )}
        </section>
    );
}