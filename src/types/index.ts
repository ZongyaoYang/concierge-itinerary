export interface Reservation {
    id: string;
    destination: string;
    villa: string;
    arrival_date: string;
    departure_date: string;
    member: {
        name: string;
        email: string;
    };
}


export interface ProposalItem {
    category: string;
    title: string;
    description: string;
    scheduled_at: string;
    price: number;
}

export interface Proposal {
    id: string;
    status: string;
    created_at: string;
    items: ProposalItem[];
}
