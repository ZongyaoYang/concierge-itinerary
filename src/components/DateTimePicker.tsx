"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface DateTimePickerProps {
    value: string;
    onChange: (value: string) => void;
}

export function DateTimePicker({ value, onChange }: DateTimePickerProps) {
    const initialDate = value ? new Date(value) : undefined;

    const [date, setDate] = useState<Date | undefined>(initialDate);
    const [time, setTime] = useState<string>("12:00");
    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        if (date) {
            const [hours, minutes] = time.split(":");
            const newDateTime = new Date(date);
            newDateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10));

            const formattedLocal = format(newDateTime, "yyyy-MM-dd'T'HH:mm");
            if (formattedLocal !== value) {
                onChange(formattedLocal);
            }
        }
    }, [date, time, value, onChange]);

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal border-gray-300",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(new Date(value || date.toISOString()), "PPP p") : <span>Pick a date & time</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
                <div className="p-3 border-t border-border flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Time</span>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="p-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                </div>

                {/* ADD THIS NEW FOOTER WITH CONFIRM BUTTON */}
                <div className="p-3 border-t border-border bg-gray-50 flex justify-end rounded-b-md">
                    <Button size="sm" onClick={() => setIsOpen(false)} className="bg-black text-white hover:bg-gray-800">
                        Confirm
                    </Button>
                </div>

            </PopoverContent>
        </Popover>
    );
}
