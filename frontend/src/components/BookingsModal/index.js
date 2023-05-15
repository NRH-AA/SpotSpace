import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import { csrfFetch } from '../../store/csrf';
import Calendar from 'react-calendar';
import { differenceInCalendarDays } from 'date-fns';
import { createBooking } from '../../store/spots';
import './Bookings.css';

const BookingsModal = ({spot}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [startDate, setStartDate] = useState(new Date());
    const [filledDates, setFilledDates] = useState(null);
    const [getBookings, setGetBookings] = useState(true);
    const [days, setDays] = useState(0);
    const [errors, setErrors] = useState('');
    
    
    const getDaysArray = (start, end) => {
        for(var arr=[], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate()+1)) {
            arr.push(new Date(dt));
        }
        return arr;
    };
    
    const getSpotBookings = async () => {
        const res = await csrfFetch(`/api/spots/${spot.id}/bookings`);
        if (res.ok) {
            const data = await res.json();
            
            if (data) {
                let newFilledDates = [];
                for (let i = 0; i < data.Bookings.length - 1; i++) {
                    const booking = data.Bookings[i];
                    const bookingDays = getDaysArray(new Date(booking.startDate), new Date(booking.endDate));
                    newFilledDates = [...newFilledDates, ...bookingDays];
                }
                console.log(newFilledDates);
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
    
    useEffect(() => {
        const daysCount = getDaysArray(startDate[0], startDate[1]);
        setDays(daysCount.length);
    }, [startDate])
    
    function isSameDay(a, b) {
        return differenceInCalendarDays(a, b) === 0;
    }
    
    const tileDisabled = ({date, view}) => {
        return filledDates.find(dDate => isSameDay(dDate, date));
    }
    
    if (!filledDates || !spot?.id) return null;
    
    const handleBookSpot = async () => {
        for (let i = 0; i < startDate.length - 1; i++) {
            if (filledDates.find(filledDate => isSameDay(filledDate, startDate[i]))) {
                return setErrors('You have selected a booked date.');
            };
        }
        
        const data = {
            startDate: startDate[0],
            endDate: startDate[startDate.length - 1]
        };
        
        const ret = await dispatch(createBooking(spot.id, data));
        if (!ret) return setErrors('Failed to create booking. Try again.');
        alert('Booking created sucessfully!');
        return closeModal();
    }
    
    return <div id='bookings-modal-container'>
        <div id='bookings-modal-div'>
            <h2>Book {spot?.name}</h2>
            
            {errors.length ? 
                <p>{errors}</p>
            : ''}
            
            <Calendar 
                onChange={setStartDate} 
                value={startDate}
                minDate={new Date()}
                minDetail='decade'
                calendarType='US'
                selectRange
                tileDisabled={tileDisabled}
            ></Calendar>
            
            {days ? <div id='bookings-total-div'>
                <p id='bookings-total-p'>{`Book ${days} nights for $${days * spot.price}.00`}</p>
            </div>
            : ''}
            
            {(days && !errors.length ) ? <div id='bookings-button-div'>
                <button className='main-button-style bookings-button'
                    onClick={handleBookSpot}
                >Book</button>
                
                <button className='main-button-style bookings-button'
                    onClick={closeModal}
                >Cancel</button>
            </div>: ''}
            
        </div>
    </div>
};

export default BookingsModal;
