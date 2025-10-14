'use client';
import {useMemo} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface CalendarProps {
    expenses?: Record<string, number>;
}

export default function ExpenseCalendar({expenses = {}}: CalendarProps) {
    const renderTile = useMemo(
        () =>
            // eslint-disable-next-line react/display-name
            ({date}: { date: Date }) => {
                // ✅ Convert UTC → local
                const key = date.toLocaleDateString("en-CA");
                // const utcDate = "2025-10-13T17:00:00.000Z";
                // const localDate1 = new Date(utcDate);
                // const displayDate = localDate1.toLocaleDateString("en-CA"); // "2025-10-14"
                // console.log(displayDate);
                const value = expenses[key];
                return value ? (
                    <p style={{fontSize: '0.7em', color: '#0d9488'}}>
                        {value.toLocaleString('vi-VN')} đ
                    </p>
                ) : null;
            },
        [expenses]
    );

    return (
        <div className="p-4 bg-neutral-800 rounded-xl shadow-md w-full">
            <Calendar
                tileContent={renderTile}
                prevLabel="<"
                nextLabel=">"
                showNeighboringMonth={false}
                className="rounded-lg border-0 bg-neutral-800 !w-full"
            />
        </div>
    );
}
