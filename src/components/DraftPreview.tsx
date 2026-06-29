import { ProposalItem } from "@/types";
import { Trash2 } from "lucide-react";

interface Props {
    draftItems: ProposalItem[];
    handleCreateProposal: () => void;
    onRemove: (index: number) => void; // Added prop type
}

export default function DraftPreview({ draftItems, handleCreateProposal, onRemove }: Props) {
    return (
        <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Current Draft ({draftItems.length} items)</h3>
            <div className="space-y-2 mb-4">
                {draftItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded bg-gray-50">
                        <div>
                            <p className="text-sm font-medium">{item.title}</p>
                            <p className="text-xs text-gray-500">{item.category} • {item.scheduled_at}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-bold">${item.price}</span>
                            <button
                                onClick={() => onRemove(index)}
                                className="text-gray-400 hover:text-red-600 transition"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {draftItems.length > 0 && (
                <button
                    onClick={handleCreateProposal}
                    className="w-full bg-green-600 text-white py-2 rounded font-medium hover:bg-green-700 transition"
                >
                    Save as Draft Proposal
                </button>
            )}
        </div>
    );
}