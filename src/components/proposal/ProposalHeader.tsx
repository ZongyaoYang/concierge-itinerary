interface Props {
    memberName: string;
}

export default function ProposalHeader({ memberName }: Props) {
    return (
        <header className="bg-white border-b border-stone-200 py-12 px-6 text-center">
            <p className="uppercase tracking-[0.2em] text-xs text-stone-500 mb-4">
                Exclusive Resorts
            </p>
            <h1 className="text-4xl md:text-5xl font-serif mb-4 text-stone-900">
                Curated Itinerary
            </h1>
            <p className="text-lg text-stone-600 font-light max-w-xl mx-auto">
                Prepared exclusively for {memberName}
            </p>
        </header>
    );
}