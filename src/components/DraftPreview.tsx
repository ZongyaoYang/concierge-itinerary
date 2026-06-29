import { ProposalItem } from "@/types";

interface Props {
    draftItems: ProposalItem[];
    handleCreateProposal: () => void;
}

export default function DraftPreview({ draftItems, handleCreateProposal }: Props) {
    if (draftItems.length === 0) return null;

    return (
        <div className="mt-6 border-t pt-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
                Current Draft ({draftItems.length} items)
            </h3>
            <ul className="space-y-3 mb-4">
                {draftItems.map((item, idx) => (
                    <li key={idx} className="flex justify-between items-start text-sm bg-gray-50 p-3 rounded-md">
                        <div>
                            <span className="font-medium text-gray-900">{item.title}</span>
                            <span className="text-xs text-gray-500 block">
                                {item.category} • {new Date(item.scheduled_at).toLocaleString()}
                            </span>
                        </div>
                        <span className="font-medium">${item.price.toFixed(2)}</span>
                    </li>
                ))}
            </ul>
            <button
                onClick={handleCreateProposal}
                className="w-full bg-green-600 text-white py-2 rounded-md text-sm font-medium hover:bg-green-700 transition"
            >
                Save as Draft Proposal
            </button>
        </div>
    );
}