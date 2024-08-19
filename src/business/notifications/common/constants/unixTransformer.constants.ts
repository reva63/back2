import { ValueTransformer } from 'typeorm';

const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
};

export const UNIX_TIME_TRANSFORMER: ValueTransformer = {
    to: (value: Date): number => Math.floor(value.getTime() / 1000), // convert Date type to Unix-time (seconds)
    from: (value: number): string => {
        const date = new Date(value * 1000);
        return formatDate(date); // convert Unix-time (seconds) to formatted date string
    },
};
