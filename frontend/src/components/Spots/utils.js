import { differenceInCalendarDays } from 'date-fns';

// Check is two dates are the same day.
export const isSameDay = (a, b) => differenceInCalendarDays(a, b) === 0;

// Get all dates inbetween two dates.
export const getDaysArray = (start, end, isCount) => {
    const array = [];
    
    start = new Date(start);
    end = new Date(end);
    
    if (isSameDay(start, end)) return [start];
    
    let currDate = start;
    while (currDate.getDate() < end.getDate()) {
        array.push(currDate);
        const nextDate = currDate.setDate(currDate.getDate() + 1);
        currDate = new Date(nextDate);
    }
    
    return array;
};

// Get all dates booked for a spot. bookings[0].startDate - bookings[0].endDate
export const getSpotFilledDates = (bookings) => {
    if (!bookings) return [];
    let newFilledDates = [];

    for (let i = 0; i < bookings.length; i++) {
        const booking = bookings[i];
        const bookingDays = getDaysArray(booking.startDate, booking.endDate);
        if (Array.isArray(bookingDays)) {
             newFilledDates = [...newFilledDates, ...bookingDays];
        }
    };

    return newFilledDates;
};
