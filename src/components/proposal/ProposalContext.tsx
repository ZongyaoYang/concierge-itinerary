interface Props {
    villa: string;
    destination: string;
    arrivalDate: string;
    departureDate: string;
}

export default function ProposalContext({ villa, destination, arrivalDate, departureDate }: Props) {
    return (
        <div className="bg-white p-8 rounded-sm shadow-sm border border-stone-100 mb-12 text-center flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-left">
                <p className="text-sm uppercase tracking-widest text-stone-400 mb-1">Destination</p>
                <p className="font-serif text-xl">{villa}</p>
                <p className="text-stone-500">{destination}</p>
            </div>
            <div className="h-12 w-[1px] bg-stone-200 hidden md:block"></div>
            <div className="text-right">
                <p className="text-sm uppercase tracking-widest text-stone-400 mb-1">Dates</p>
                <p className="text-stone-800">
                    {new Date(arrivalDate).toLocaleDateString()} —{" "}
                    {new Date(departureDate).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
}