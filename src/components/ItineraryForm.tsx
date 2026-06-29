import { ProposalItem } from "@/types";
import { SubmitEvent, Dispatch, SetStateAction } from "react";
import { DateTimePicker } from "./DateTimePicker";

interface Props {
    newItem: ProposalItem;
    setNewItem: Dispatch<SetStateAction<ProposalItem>>;
    handleAddItem: (e: SubmitEvent<HTMLFormElement>) => void;
}

export default function ItineraryForm({ newItem, setNewItem, handleAddItem }: Props) {
    const categories = ["Dining 🍽 ", "Activities 🏄", "Wellness 💆", "Excursions ⛵", "Transport 🚗 ", "Experiences 🌅 "];
    const inputStyles = "w-full p-2 border border-gray-300 rounded-md text-sm text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent";

    const timeZoneIndicator = "Mountain Standard Time"
    return (
        <form onSubmit={handleAddItem} className="space-y-4 mb-6 bg-gray-50 p-4 rounded-md border border-gray-100">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                    <select
                        className={inputStyles}
                        value={newItem.category}
                        onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    >
                        {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                        Date & Time ({timeZoneIndicator})
                    </label>
                    <DateTimePicker
                        value={newItem.scheduled_at}
                        onChange={(val) => setNewItem({ ...newItem, scheduled_at: val })}
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                <input
                    type="text"
                    required
                    placeholder="e.g. Private Chef Welcome Dinner"
                    className={inputStyles}
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    required
                    rows={2}
                    className={inputStyles}
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                />
            </div>

            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Price ($)</label>
                <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    className={inputStyles}
                    value={newItem.price || ""}
                    onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                />
            </div>

            <button type="submit" className="w-full bg-black text-white py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition">
                Add Line Item
            </button>
        </form>
    );
}