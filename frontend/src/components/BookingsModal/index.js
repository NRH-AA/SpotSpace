import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import Calendar from 'react-calendar';
import { differenceInCalendarDays } from 'date-fns';
import './Bookings.css';

const BookingsModal = ({spotId}) => {
    const [startDate, setStartDate] = useState(new Date());
    
    
    
    if (!spotId) return null;
    
    function isSameDay(a, b) {
        return differenceInCalendarDays(a, b) === 0;
    }
    
    const tileDisabled = ({date, view}) => {
        const disabledDates = [];
        return disabledDates.find(dDate => isSameDay(dDate, date));
    }
    
    
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
