export const getDefaultOccurredAt = () => {
    const now = new Date();
    now.setHours(14, 30, 0, 0);
    const tzOffset = -now.getTimezoneOffset();
    const sign = tzOffset >= 0 ? '+' : '-';
    const hours = String(Math.floor(Math.abs(tzOffset) / 60)).padStart(2, '0');
    const minutes = String(Math.abs(tzOffset) % 60).padStart(2, '0');
    const offset = `${sign}${hours}:${minutes}`;
    const localISO = now.toISOString().slice(0, 19);
    return `${localISO}${offset}`;
};


export const getCurrentMonthRange = () => {
    const now = new Date();

    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const toDateStr = (d: Date) => d.toISOString().split("T")[0];

    return {
        startDate: toDateStr(start),
        endDate: toDateStr(end),
    };
};
