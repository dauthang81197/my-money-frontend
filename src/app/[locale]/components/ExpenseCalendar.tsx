'use client';
import { useMemo } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface CalendarProps {
  expenses?: Record<string, number>;
}

export default function ExpenseCalendar({ expenses = {} }: CalendarProps) {
  const renderTile = useMemo(
    () =>
      // eslint-disable-next-line react/display-name
      ({ date }: { date: Date }) => {
        const key = date.toISOString().split('T')[0];
        const value = expenses[key];
        return value ? (
          <p style={{ fontSize: '0.7em', color: '#0d9488' }}>
            {value.toLocaleString('vi-VN')} đ
          </p>
        ) : null;
      },
    [expenses]
  );

  return (
    <div className="p-4 bg-neutral-800 rounded-xl shadow-md w-full">
      <Calendar
        locale="vi-VN"
        tileContent={renderTile}
        prevLabel="<"
        nextLabel=">"
        showNeighboringMonth={false}
        className="rounded-lg border-0 bg-neutral-800 !w-full"
      />
    </div>
  );
}
