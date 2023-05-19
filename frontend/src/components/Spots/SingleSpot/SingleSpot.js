import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Calendar from 'react-calendar';
import { getSpot, getSpotBookings } from "../../../store/spots";
import { getSpotFilledDates, isSameDay, getDaysArray } from "../utils";
import SingleSpotImagesComponant from "./SingleSpotImages";
import ReviewsComponent from "../../Reviews";
import OpenModalButton from "../../OpenModalButton";
import DeleteSpotModal from "../../DeleteSpotModal";
import UpdateSpotModal from "../../UpdateSpotModal";
import MarkDownComponant from "../../MarkdownComponent";
import './SingleSpot.css';

const SingleSpot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.singleSpot);
    const bookings = useSelector(state => state.spots.bookings);
    const userState = useSelector(state => state.session.user);
    
    const [tomorrowsDate, setTomorrowsDate] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
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
    
    // We don't have the spot data or it is the wrong spot data.
    // Update the store with the correct spot data.
    useEffect(() => {
        if (!spot || spot.id !== parseInt(spotId)) dispatch(getSpot(parseInt(spotId)));
    }, []);
    
    // Get spot bookings on each mount and when spot or dates selected changes
    // We want to get it when dates change incase someone has booked the spot
    useEffect(() => {
      const getBookings = async () => await dispatch(getSpotBookings(spot.id));
      if (spot?.id) getBookings();
    }, [spot, startDate, endDate]);
    
    // Get all dates booked so far and add them to our filledDates state.
    useEffect(() => {
      getSpotFilledDates();
    }, [bookings, spot, startDate]);
    
    // Update guests whenever adult,children,infant state is changed.
    useEffect(() => {
      setGuests(adults + children + infants);
    }, [adults, children, infants])
    
    useEffect(() => {
      if (!tomorrowsDate) {
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + 1);
        setTomorrowsDate(newDate);
        setEndDate(newDate);
      }
    }, [])
    
    // We don't have the spot data or it is the wrong spot data. Don't render the componant.
    if (!spot || spot.id !== parseInt(spotId)) return null;
    
    const detailsText = () => {
      let text = '';
      text += `⭐${spot.avgStarRating} · ${spot.numReviews} ${spot.numReviews !== 1 ? 'Reviews' : 'Review'}`;
      text += ` ·  ${spot.state}, ${spot.city}, ${spot.country}`
      
      return (<>
        <p>{text}</p>
      </>)
    };
    
    const items = ['amenity1', 'amenity2', 'amenity3', 'amenity4', 'amenity5', 'amenity6'];
  
    const tileDisabled = ({date, view}) => {
      return filledDates.find(dDate => isSameDay(dDate, date));
    }
    
    const getDateString = (date) => {
      if (!date) return '';
      return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
    }
    const getStartCalendarClass = () => showStartCalendar ? '' : 'react-calendar--hidden';
    const getEndCalendarClass = () => showEndCalendar ? '' : 'react-calendar--hidden';
    
    const handleShowGuests = (e) => {
      if (e.type === 'mouseleave') {
        if (String(e.target.className).includes('add-sub-button')) return;
      }
      
      if (e.type === 'click') {
        if (String(e.target.className).includes('add-sub-button')) return;
      }
      
      setShowGuests(!showGuests);
    }
    
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
      }
    }
    
    return (
        <div id="singleSpot-wrapper">
          <div id='singleSpot-main-div'>
          
            <div id='singleSpot-title-div'>
                {spot?.name && <h2 className='singleSpot-h2'>{spot.name}</h2>}
                {spot?.id && detailsText()}
            </div>
            
            <SingleSpotImagesComponant />
            
            <div id='singleSpot-middle-container'>
                <div id='singleSpot-middle-div'>
                    <div id='singleSpot-middle-amenities'>
                        <div id='singleSpot-amenities-title'>
                          <h2>Spot Type</h2>
                          {spot?.Owner?.profilePicture && <img id='singleSpot-anemities-title-img'
                              src={spot?.Owner?.profilePicture} 
                              alt={spot?.Owner?.firstName}
                              title={`${spot?.Owner?.firstName}'s picture`}
                          />}
                        </div>
                        <div id='singleSpot-amenities-items'>
                            {items.map((el, i) => <div key={i} className='singleSpot-amenities-item'>
                              <p>{el}</p>
                              
                            </div>)}
                        </div>
                    </div>
                    
                    <div id='singleSpot-middle-about-div'>
                      <p>About this spot</p>
                    </div>
                    
                </div>
                
                {(spot?.Owner?.id !== userState?.id) &&
                <div id='singleSpot-middle-div2'>
                    <div id='singleSpot-booking-container'>
                        <div id='singleSpot-booking-top-div'>
                            <p>{`$${spot?.price} night`}</p>
                            <p>{`⭐${spot.avgStarRating} · ${spot.numReviews} ${spot.numReviews !== 1 ? `Reviews` : `Review`}`}</p>
                        </div>
                        
                        <div id='singleSpot-booking-calendar-container'>
                              <div id='singleSpot-booking-calendar-div'>
                                  <div className='singleSpot-booking-calendar'
                                    onClick={() => {setShowStartCalendar(!showStartCalendar); setShowEndCalendar(false)}}
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
                                    onClick={() => {setShowEndCalendar(!showEndCalendar); setShowStartCalendar(false)}}
                                    onMouseLeave={() => {setShowEndCalendar(false); setShowStartCalendar(false)}}
                                  >
                                    <p className='singleSpot-small-p'>CHECKOUT</p>
                                    <p className='singleSpot-date-string'>{`${getDateString(endDate)}`}</p>
                                    <Calendar className={getEndCalendarClass()}
                                        onChange={setEndDate}
                                        value={endDate}
                                        minDate={tomorrowsDate}
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
                                      <i className="fa fa-minus-circle add-sub-button"
                                        onClick={() => getGuestValue(1, -1)}
                                      />
                                      <p className='singleSpot-guests-p'>{adults}</p>
                                      <i className="fa fa-plus-circle add-sub-button"
                                        onClick={() => getGuestValue(1, 1)}
                                      />
                                    </div>
                                  </div>
                                  
                                  <div className='singleSpot-guests-dropdown-type'>
                                    <div className='singleSpot-guests-dropdown-type-left'>
                                      <p className='singleSpot-medium-p'>Children</p>
                                      <p className='singleSpot-date-string'>Ages 2-12</p>
                                    </div>
                                    
                                    <div className='singleSpot-guests-dropdown-type-right'>
                                      <i className="fa fa-minus-circle add-sub-button"
                                        onClick={() => getGuestValue(2, -1)}
                                      />
                                      <p className='singleSpot-guests-p'>{children}</p>
                                      <i className="fa fa-plus-circle add-sub-button"
                                        onClick={() => getGuestValue(2, 1)}
                                      />
                                    </div>
                                  </div>
                                  
                                  <div className='singleSpot-guests-dropdown-type'>
                                    <div className='singleSpot-guests-dropdown-type-left'>
                                      <p className='singleSpot-medium-p'>Infants</p>
                                      <p className='singleSpot-date-string'>Under 2</p>
                                    </div>
                                    
                                    <div className='singleSpot-guests-dropdown-type-right'>
                                      <i className="fa fa-minus-circle add-sub-button"
                                        onClick={() => getGuestValue(3, -1)}
                                      />
                                      <p className='singleSpot-guests-p'>{infants}</p>
                                      <i className="fa fa-plus-circle add-sub-button"
                                        onClick={() => getGuestValue(3, 1)}
                                      />
                                    </div>
                                  </div>
                                  
                                </div>: ''}
                                
                              </div>
                        </div>
                        
                        <div>
                          {getDaysArray(startDate, endDate, true).length} night(s) selected
                        </div>
                        
                    </div>
                </div>
                }
            </div>
            
            <div id='singleSpot-reviews-container'>
              <ReviewsComponent spotId={parseInt(spotId)} />
            </div>
            
          </div>
        </div>
    );
};

export default SingleSpot;
