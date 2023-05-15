import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import { csrfFetch } from '../../store/csrf';
import Calendar from 'react-calendar';
import { differenceInCalendarDays } from 'date-fns';
import './Bookings.css';

const BookingsModal = ({spotId}) => {
    const [startDate, setStartDate] = useState(new Date());
    const [filledDates, setFilledDates] = useState(null);
    const [getBookings, setGetBookings] = useState(true);
    
    
    const getDaysArray = (start, end) => {
        for(var arr=[], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate()+1)) {
            arr.push(new Date(dt));
        }
        return arr;
    };
    
    const getSpotBookings = async () => {
        const res = await csrfFetch(`/api/spots/${spotId}/bookings`);
        if (res.ok) {
            const data = await res.json();
            
            if (data) {
                const newFilledDates = [];
                for (let i = 0; i < data.Bookings.length - 1; i++) {
                    const booking = data.Bookings[i];
                    const bookingDays = getDaysArray(booking.startDate, booking.endDate);
                    newFilledDates = [...newFilledDates, ...bookingDays];
                }
                
                setFilledDates(newFilledDates);
            } else {
                setFilledDates([]);
            };
        };
    };
    
    useEffect(() => {
        if (getBookings) {
            getSpotBookings();
            setGetBookings(false);
        };
    }, [getBookings]);
    
    if (!spotId) return null;
    
    function isSameDay(a, b) {
        return differenceInCalendarDays(a, b) === 0;
    }
    
    const tileDisabled = ({date, view}) => {
        return filledDates.find(dDate => isSameDay(dDate, date));
    }
    
    if (!filledDates) return null;
    
    return <div id='bookings-modal-container'>
        <Calendar 
            onChange={setStartDate} 
            value={startDate}
            minDate={new Date()}
            minDetail='decade'
            calendarType='US'
            selectRange
            tileDisabled={tileDisabled}
        ></Calendar>
    </div>
};

export default BookingsModal;
