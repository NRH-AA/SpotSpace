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
    const [days, setDays] = useState(0);
    const [errors, setErrors] = useState('');
    const [hasData, setHasData] = useState(false);
    
    
    
    const addDays = (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
    
    const getDaysArray = (start, end) => {
        const array = [];
        
        let currDate = start;
        if (!start) return;
        
        while (currDate.getDate() <= end.getDate()) {
            array.push(currDate);
            currDate = addDays(currDate, 1);
        }
        
        return array;
    };
    
    const getSpotBookings = async () => {
        const res = await csrfFetch(`/api/spots/${spot.id}/bookings`);
        if (res.ok) {
            const data = await res.json();
            
            if (data) {
                let newFilledDates = [];
                
                for (let i = 0; i < data.Bookings.length - 1; i++) {
                    const booking = data.Bookings[i];
                    const bookingDays = getDaysArray(new Date(booking.startDate), new Date(booking.endDate || booking.startDate));
                    newFilledDates = [...newFilledDates, ...bookingDays];
                };

                setFilledDates(newFilledDates);
            } else {
                setFilledDates([]);
            };
        };
    };
    
    useEffect(() => {
        const getSpots = async () => {
            setHasData(false);
            await getSpotBookings();
            setHasData(true);
        }
        getSpots();
    }, []);
    
    useEffect(() => {
        const daysCount = getDaysArray(startDate[0], startDate[1]);
        setDays(daysCount?.length);
    }, [startDate]);
    
    function isSameDay(a, b) {
        return differenceInCalendarDays(a, b) === 0;
    }
    
    const tileDisabled = ({date, view}) => {
        return filledDates.find(dDate => isSameDay(dDate, date));
    }
    
    if (!filledDates || !spot?.id || !hasData) return null;
    
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
        
        setFilledDates(null);
        setDays(0);
        setHasData(false);
        
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
