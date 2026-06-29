import { ProposalItem } from "@/types";

interface Props {
    groupedItems: Record<string, ProposalItem[]>;
}

export default function ProposalTimeline({ groupedItems }: Props) {
    return (
        <div className="space-y-12">
            {Object.entries(groupedItems).map(([date, items]) => (
                <div key={date}>
                    <h2 className="font-serif text-2xl text-stone-800 mb-6 pb-2 border-b border-stone-200">
                        {date}
                    </h2>
                    <div className="space-y-6">
                        {items.map((item, idx) => (
                            <div key={idx} className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                                <div className="flex-1">
                                    <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-1">
                                        {new Date(item.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {item.category}
                                    </p>
                                    <h3 className="text-lg font-medium text-stone-900 mb-2">{item.title}</h3>
                                    <p className="text-stone-600 text-sm leading-relaxed">{item.description}</p>
                                </div>
                                <div className="md:text-right font-serif text-lg text-stone-800">
                                    ${item.price.toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}