import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import Calendar from 'react-calendar';
import './Bookings.css';

const BookingsModal = ({spotId}) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    
    
    
    if (!spotId) return null;
    
    return <div id='bookings-modal-container'>
        <Calendar onChange={setStartDate} value={startDate}></Calendar>
        <Calendar onChange={setEndDate} value={endDate}></Calendar>
    </div>
};

export default BookingsModal;
