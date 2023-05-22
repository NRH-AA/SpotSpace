import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Calendar from 'react-calendar';
import { csrfFetch } from "../../../store/csrf";
import { getSpot } from "../../../store/spots";
import { getSpotFilledDates, isSameDay, getDaysArray } from "../utils";
import './BookingComponent.css';

const BookingComponant = () => {
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.singleSpot);
    
    const [bookings, setBookings] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [showStartCalendar, setShowStartCalendar] = useState(false);
    const [endDate, setEndDate] = useState(null);
    const [showEndCalendar, setShowEndCalendar] = useState(false);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [guests, setGuests] = useState(1);
    const [showGuests, setShowGuests] = useState(false);
    const [filledDates, setFilledDates] = useState([]);
    const [days, setDays] = useState(0);
    const [error, setError] = useState(null);
    
    
    // Fetch spot bookings from API
    const getSpotBookings = async () => {
        const res = await csrfFetch(`/api/spots/${spot.id}/bookings`);
        
        if (res.ok) {
            const data = await res.json();
            if (data) return setBookings(data.Bookings);
        }
        setBookings({});
    };
    
    // Get spot bookings on each mount and when spot or dates selected changes
    // We want to get it when dates change incase someone has booked the spot
    useEffect(() => {
        const getBookings = async () => await getSpotBookings(spot.id);
        if (spot?.id) getBookings();
    }, [spot, startDate, endDate]);
      
    // Get all dates booked so far and add them to our filledDates state.
    useEffect(() => {
        setFilledDates(getSpotFilledDates(bookings));
    }, [bookings]);
      
    // Update guests whenever adult,children,infant state is changed.
    useEffect(() => {
        setGuests(adults + children + infants);
    }, [adults, children, infants]);
    
    // Update days selected
    useEffect(() => {
        if (!endDate) return;
        setDays(getDaysArray(startDate, endDate, true).length - 1);
        setError('');
    }, [startDate, endDate]);
    
    if (!spot?.id) return null;
    
    const tileDisabled = ({date, view}) => {
        return filledDates.find(dDate => isSameDay(dDate, date));
    };
    
    const getDateString = (date) => {
        if (!date) return '';
        return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
    };
    
    const getStartCalendarClass = () => showStartCalendar ? '' : 'react-calendar--hidden';
    const getEndCalendarClass = () => showEndCalendar ? '' : 'react-calendar--hidden';
    
    const handleShowStartCalendar = (e) => {
        if (e.type === 'click') {
            if (String(e.target.className).includes('react-calendar')) return;
        };
        
        setShowStartCalendar(!showStartCalendar); 
        setShowEndCalendar(false)
    }
    
    const handleShowEndCalendar = (e) => {
        if (e.type === 'click') {
            if (String(e.target.className).includes('react-calendar')) return;
        };
        
        setShowEndCalendar(!showEndCalendar); 
        setShowStartCalendar(false)
    }
    
    const handleShowGuests = (e) => {
        const targetClassName = String(e?.target?.className);
        const targetId = String(e?.target?.id);
        if (e.type === 'mouseleave') {
            if (targetClassName.includes('add-sub-i')) return;
            if (targetClassName.includes('add-sub-button')) return;
            if (targetId.includes('add-sub-button')) return;
            if (targetClassName.includes('singleSpot-guests-p')) return;
        };
        
        if (e.type === 'click') {
            if (targetClassName.includes('add-sub-i')) return;
            if (targetClassName.includes('add-sub-button')) return;
            if (targetId.includes('add-sub-button')) return;
            if (targetClassName.includes('singleSpot-guests-p')) return;
            if (targetId.includes('singleSpot-guests-dropdown')) return;
        };
        
        setShowGuests(!showGuests);
    };
    
    const getGuestValue = (type, amount) => {
        if (type === 1) {
          let newAmount = adults + amount;
          if (newAmount < 1) newAmount = 1;
          return setAdults(newAmount);
        } else if (type === 2) {
          let newAmount = children + amount;
          if (newAmount < 0) newAmount = 0;
          return setChildren(newAmount);
        } else if (type === 3) {
          let newAmount = infants + amount;
          if (newAmount < 0) newAmount = 0;
          return setInfants(newAmount);
        };
    };
    
    // Create spot booking
    const createSpotBooking = async () => {
        if (!startDate) return setError('Please select a check-in date.');
        if (!endDate) return setError('Please select a checkout date.');
        if (isSameDay(startDate, endDate)) return setError('Check-In and Checkout can not be the same day.');
        if (endDate < startDate) return setError('Checkout must be after Check-In.');
        
        const res = await csrfFetch(`/api/spots/${spot.id}/bookings`, {
            method: 'POST',
            body: JSON.stringify({
                startDate,
                endDate
            })
        });
        
        if (res.ok) {
            dispatch(getSpot(spot.id));
            return setError('You have booked the spot.');
        }
        else setError('Failed to create booking. Please try again.');
    };
    
    // Disable guests min/max buttons
    // param (type) 1: Adults | 2: Children | 3: Infants
    const isGuestMaxDisabled = () => guests === spot.maxGuests;
    const isGuestMinDisabled = (type) => {
        if (type === 1) return adults === 1;
        if (type === 2) return children === 0;
        if (type === 3) return infants === 0;
    }
    
    
    return (
        <div id='singleSpot-middle-div2'>
            <div id='singleSpot-booking-container'>
                <div id='singleSpot-booking-top-div'>
                    <p>{`$${spot?.price} night`}</p>
                    <p>{`⭐${spot.avgStarRating} · ${spot.numReviews} ${spot.numReviews !== 1 ? `Reviews` : `Review`}`}</p>
                </div>
                
                {error && <p>{error}</p>}
                        
                <div id='singleSpot-booking-calendar-container'>
                    <div id='singleSpot-booking-calendar-div'>
                        <div className='singleSpot-booking-calendar'
                            onClick={handleShowStartCalendar}
                            onMouseLeave={() => {setShowStartCalendar(false); setShowEndCalendar(false)}}
                        >
                            <p className='singleSpot-small-p'>CHECK-IN</p>
                            <p className='singleSpot-date-string'>{`${getDateString(startDate)}`}</p>
                            <Calendar className={getStartCalendarClass()}
                                onChange={setStartDate}
                                value={startDate}
                                minDate={new Date()}
                                minDetail='decade'
                                calendarType='US'
                                tileDisabled={tileDisabled}
                            ></Calendar>
                                    
                        </div>
                                  
                        <div className='singleSpot-booking-calendar2'
                            onClick={handleShowEndCalendar}
                            onMouseLeave={() => {setShowEndCalendar(false); setShowStartCalendar(false)}}
                        >
                            <p className='singleSpot-small-p'>CHECKOUT</p>
                            <p className='singleSpot-date-string'>{`${getDateString(endDate)}`}</p>
                            <Calendar className={getEndCalendarClass()}
                                onChange={setEndDate}
                                value={endDate}
                                minDate={startDate ? startDate : new Date()}
                                minDetail='decade'
                                calendarType='US'
                                tileDisabled={tileDisabled}
                            ></Calendar>
                        </div>
                    </div>

                    <div id='singleSpot-booking-guests'
                         onClick={(e) => handleShowGuests(e)}
                    >
                        <div id='singleSpot-booking-guests-top'>
                            <p className='singleSpot-small-p'>GUESTS</p>
                            {!showGuests ?
                                <i className="fa fa-angle-down singleSpot-guest-arrow"/>
                            :
                                <i className="fa fa-angle-up singleSpot-guest-arrow"/>
                            }
                        </div>
                        
                        <p className='singleSpot-guest-string'>{`${guests} ${guests > 1 ? 'guests' : 'guest'}`}</p>
                            
                        {showGuests ?
                        <div id='singleSpot-guests-dropdown'
                            onMouseLeave={(e) => handleShowGuests(e)}
                        >
                            <div className='singleSpot-guests-dropdown-type'>
                                <div className='singleSpot-guests-dropdown-type-left'>
                                    <p className='singleSpot-medium-p'>Adults</p>
                                    <p className='singleSpot-date-string'>Age 13+</p>
                                </div>
                                    
                                <div className='singleSpot-guests-dropdown-type-right'>
                                    <button className='add-sub-button'
                                        onClick={() => getGuestValue(1, -1)}
                                        disabled={isGuestMinDisabled(1)}
                                    ><i className="fa-solid fa-minus add-sub-i"/></button>
                                        
                                    <p className='singleSpot-guests-p'>{adults}</p>
                                    
                                    <button className='add-sub-button'
                                        onClick={() => getGuestValue(1, 1)}
                                        disabled={isGuestMaxDisabled(1)}
                                    ><i className="fa-solid fa-plus add-sub-i"/></button>
                                </div>
                            </div>
                                  
                            <div className='singleSpot-guests-dropdown-type'>
                                <div className='singleSpot-guests-dropdown-type-left'>
                                    <p className='singleSpot-medium-p'>Children</p>
                                    <p className='singleSpot-date-string'>Ages 2-12</p>
                                </div>
                                    
                                <div className='singleSpot-guests-dropdown-type-right'>
                                    <button className='add-sub-button'
                                        onClick={() => getGuestValue(2, -1)}
                                        disabled={isGuestMinDisabled(2)}
                                    ><i className="fa-solid fa-minus add-sub-i"/></button>
                                    
                                    <p className='singleSpot-guests-p'>{children}</p>
                                    
                                    <button className='add-sub-button'
                                        onClick={() => getGuestValue(2, 1)}
                                        disabled={isGuestMaxDisabled(2)}
                                    ><i className="fa-solid fa-minus add-sub-i"/></button>
                                </div>
                            </div>
                                  
                            <div className='singleSpot-guests-dropdown-type'>
                                <div className='singleSpot-guests-dropdown-type-left'>
                                    <p className='singleSpot-medium-p'>Infants</p>
                                    <p className='singleSpot-date-string'>Under 2</p>
                                </div>
                                    
                                <div className='singleSpot-guests-dropdown-type-right'>
                                    <button className='add-sub-button'
                                        onClick={() => getGuestValue(3, -1)}
                                        disabled={isGuestMinDisabled(3)}
                                    ><i className="fa-solid fa-minus add-sub-i"/></button>
                                        
                                    <p className='singleSpot-guests-p'>{infants}</p>
                                    
                                    <button className='add-sub-button'
                                        onClick={() => getGuestValue(3, 1)}
                                        disabled={isGuestMaxDisabled(3)}
                                    ><i className="fa-solid fa-minus add-sub-i"/></button>
                                </div>
                            </div>
                                  
                        </div>: ''}
                                
                    </div>
                </div>
                
                <button id='booking-create-button' className='main-button-style'
                    onClick={createSpotBooking}
                >Reserve</button>
                <p>You won't be charged yet.</p>
                
                <div id='booking-costs-div'>
                    <div className='booking-costs-item-div'>
                        <p className='booking-costs-p'>{`$${spot?.price} x ${days} nights`}</p>
                        <p className='booking-costs-p2'>{`$${spot?.price * days}`}</p>
                    </div>
                    <div className='booking-costs-item-div'>
                        <p className='booking-costs-p'>Cleaning fee</p>
                        <p className='booking-costs-p2'>${days > 0 ? spot?.cleaningFee : 0}</p>
                    </div>
                    <div className='booking-costs-item-div'>
                        <p className='booking-costs-p'>SpotSpace service fee</p>
                        <p className='booking-costs-p2'>${days > 0 ? '20' : '0'}</p>
                    </div>
                </div>
                
                <div id='booking-total-cost-div'>
                    <p>Total before taxes</p>
                    <p>{`$${(spot?.price * days) + (days > 0 ? spot?.cleaningFee : 0) + (days > 0 ? 20 : 0)}`}</p>
                </div>

            </div>
        </div>
    )
}

export default BookingComponant;
