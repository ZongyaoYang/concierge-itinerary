import { Reservation } from "@/types";

export default function Header({ reservation }: { reservation: Reservation }) {
    return (
        <header className="bg-white p-6 rounded-lg shadow-sm border boarder-gray-200 flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">Concierge Dashboard</h1>
                <p className="text-gray-500 mt-1">
                    Planning for: <span className="font-medium text-gray-800">{reservation.member.name}</span> at {reservation.villa}, {reservation.destination}
                </p>
            </div>
            <div className="text-right text-sm text-gray-500">
                <p>Arrival: {new Date(reservation.arrival_date).toLocaleDateString()}</p>
                <p>Departure: {new Date(reservation.departure_date).toLocaleDateString()}</p>
            </div>
        </header >
    );
}
