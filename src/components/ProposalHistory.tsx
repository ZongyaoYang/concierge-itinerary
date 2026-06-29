"use client";

import { Trash2 } from "lucide-react"; // Import the icon
import { Proposal } from "@/types";

interface Props {
    proposals: Proposal[];
    refreshData: () => void;
    onDelete: (id: string) => void; // Added delete prop
}

export default function ProposalHistory({ proposals, refreshData, onDelete }: Props) {
    const handleSendProposal = async (id: string) => {
        await fetch(`/api/proposals/${id}/send`, { method: "POST" });
        refreshData();
    };

    return (
        <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 overflow-y-auto max-h-[800px]">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Proposal History</h2>

            {proposals.length === 0 ? (
                <p className="text-sm text-gray-500">No proposals created yet.</p>
            ) : (
                <div className="space-y-4">
                    {proposals.map((proposal) => (
                        <div key={proposal.id} className="border border-gray-200 rounded-md p-4 flex flex-col">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs text-gray-500">ID: {proposal.id.slice(0, 8)}...</span>
                                {/* Added Delete button here in the header */}
                                <div className="flex items-center gap-2">
                                    {proposal.status === 'draft' && (
                                        <button
                                            onClick={() => onDelete(proposal.id)}
                                            className="text-gray-400 hover:text-red-600 transition"
                                            title="Delete Proposal"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                    <span className={`px-2 py-1 text-xs rounded-full font-medium uppercase
                                      ${proposal.status === 'draft' ? 'bg-gray-100 text-gray-600' :
                                            proposal.status === 'sent' ? 'bg-blue-100 text-blue-600' :
                                                proposal.status === 'approved' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-green-100 text-green-700'}`}>
                                        {proposal.status}
                                    </span>
                                </div>
                            </div>

                            <p className="text-sm text-gray-800 font-medium">{proposal.items.length} Itinerary Items</p>
                            <p className="text-xs text-gray-500 mb-4">
                                Total: ${proposal.items.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                            </p>

                            <div className="flex space-x-2 mt-auto">
                                {proposal.status === 'draft' && (
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
                    ))}
                </div>
            )}
        </section>
    );
}