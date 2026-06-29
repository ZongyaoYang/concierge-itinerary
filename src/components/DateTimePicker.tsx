"use client";

import * as React from "react";
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
    // Parse the incoming ISO string to a Date object, or leave undefined
    const initialDate = value ? new Date(value) : undefined;

    const [date, setDate] = React.useState<Date | undefined>(initialDate);
    const [time, setTime] = React.useState<string>("12:00");

    // When either date or time changes, format it back to an ISO string for our form state
    React.useEffect(() => {
        if (date) {
            const [hours, minutes] = time.split(":");
            const newDateTime = new Date(date);
            newDateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10));

            // We slice it to match the "YYYY-MM-DDTHH:mm" format expected by our state
            const formattedIso = newDateTime.toISOString().slice(0, 16);
            onChange(formattedIso);
        }
    }, [date, time]);

    return (
        <Popover>
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
            </PopoverContent>
        </Popover>
    );
}