import { ProposalStatus } from "@prisma/client";

interface Props {
    totalCost: number;
    status: string;
    isProcessing: boolean;
    updateStatus: (newStatus: ProposalStatus) => void;
}

export default function ProposalSummary({ totalCost, status, isProcessing, updateStatus }: Props) {
    return (
        <div className="mt-16 bg-stone-900 text-stone-50 p-8 rounded-sm shadow-xl">
            <div className="flex justify-between items-center mb-8 border-b border-stone-700 pb-6">
                <span className="font-serif text-2xl tracking-wide">Total Cost</span>
                <span className="font-serif text-3xl">${totalCost.toFixed(2)}</span>
            </div>

            <div className="flex flex-col gap-4">
                {status === ProposalStatus.SENT && (
                    <button
                        onClick={() => updateStatus(ProposalStatus.APPROVED)}
                        disabled={isProcessing}
                        className="w-full bg-white text-stone-900 py-4 font-semibold uppercase tracking-widest text-sm hover:bg-stone-200 transition disabled:opacity-50"
                    >
                        {isProcessing ? "Processing..." : "Approve Itinerary"}
                    </button>
                )}

                {status === ProposalStatus.APPROVED && (
                    <button
                        onClick={() => updateStatus(ProposalStatus.PAID)}
                        disabled={isProcessing}
                        className="w-full bg-emerald-600 text-white py-4 font-semibold uppercase tracking-widest text-sm hover:bg-emerald-500 transition shadow-lg disabled:opacity-50"
                    >
                        {isProcessing ? "Processing..." : "Pay & Lock In"}
                    </button>
                )}

                {(status === ProposalStatus.SENT || status === "draft") && (
                    <p className="text-center text-stone-400 text-xs mt-2 font-light">
                        By approving, you agree to the curated schedule above. Payment will be required to lock in reservations.
                    </p>
                )}
            </div>
        </div>
    );
}