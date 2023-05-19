import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Calendar from 'react-calendar';
import { getSpot, getSpotBookings } from "../../store/spots";
import { getSpotFilledDates, isSameDay, getDaysArray } from "./utils";
import ReviewsComponent from "../Reviews";
import OpenModalButton from "../OpenModalButton";
import DeleteSpotModal from "../DeleteSpotModal";
import UpdateSpotModal from "../UpdateSpotModal";
import MarkDownComponant from "../MarkdownComponent";
import './SingleSpot.css';

const SingleSpot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.singleSpot);
    const bookings = useSelector(state => state.spots.bookings);
    const userState = useSelector(state => state.session.user);

    const [startDate, setStartDate] = useState(new Date());
    const [showStartCalendar, setShowStartCalendar] = useState(false);
    const [endDate, setEndDate] = useState(new Date());
    const [showEndCalendar, setShowEndCalendar] = useState(false);
    const [guests, setGuests] = useState(1);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
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
    
    // We don't have the spot data or it is the wrong spot data. Don't render the componant.
    if (!spot || spot.id !== parseInt(spotId)) return null;
    
    const detailsText = () => {
      let text = '';
      text += `⭐${spot.avgStarRating} · ${spot.numReviews} ${spot.numReviews > 1 ? 'Reviews' : 'Review'}`;
      text += ` ·  ${spot.state}, ${spot.city}, ${spot.country}`
      
      return (<>
        <p>{text}</p>
      </>)
    };
    
    const getSpotImages = () => {
      if (spot?.SpotImages?.length === 1) return <img id='singleSpot-previewImg-only' src={spot.SpotImages[0].url}/>
      return <></>
    }
    
    const items = ['amenity1', 'amenity2', 'amenity3', 'amenity4', 'amenity5', 'amenity6'];
  
    const tileDisabled = ({date, view}) => {
      return filledDates.find(dDate => isSameDay(dDate, date));
    }
    
    const getDateString = (date) => `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
    const getStartCalendarClass = () => showStartCalendar ? '' : 'react-calendar--hidden';
    const getEndCalendarClass = () => showEndCalendar ? '' : 'react-calendar--hidden';
    
    return (
        <div id="singleSpot-wrapper">
          <div id='singleSpot-main-div'>
          
            <div id='singleSpot-title-div'>
                {spot?.name && <h2 className='singleSpot-h2'>{spot.name}</h2>}
                {spot?.id && detailsText()}
            </div>
            
            {getSpotImages()}
            
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
                
                <div id='singleSpot-middle-div2'>
                    <div id='singleSpot-booking-container'>
                        <div id='singleSpot-booking-top-div'>
                            <p>{`$${spot?.price} night`}</p>
                            <p>{`⭐${spot.avgStarRating} · ${spot.numReviews} ${spot.numReviews > 1 ? `Reviews` : `Review`}`}</p>
                        </div>
                        
                        <div id='singleSpot-booking-calendar-container'>
                              <div id='singleSpot-booking-calendar-div'>
                                  <div className='singleSpot-booking-calendar'
                                    onClick={() => {setShowStartCalendar(!showStartCalendar); setShowEndCalendar(false)}}
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
                                  >
                                    <p className='singleSpot-small-p'>CHECKOUT</p>
                                    <p className='singleSpot-date-string'>{`${getDateString(endDate)}`}</p>
                                    <Calendar className={getEndCalendarClass()}
                                        onChange={setEndDate}
                                        value={endDate}
                                        minDate={new Date(startDate)}
                                        minDetail='decade'
                                        calendarType='US'
                                        tileDisabled={tileDisabled}
                                    ></Calendar>
                                  </div>
                              </div>
                                  
                              <div id='singleSpot-booking-guests'
                                onClick={() => setShowGuests(!showGuests)}
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
                                <div id='singleSpot-guests-dropdown'>
              
                                  <div className='singleSpot-guests-dropdown-type'>
                                    <div className='singleSpot-guests-dropdown-type-left'>
                                      <p className='singleSpot-medium-p'>Adults</p>
                                      <p className='singleSpot-date-string'>Age 13+</p>
                                    </div>
                                    
                                    <div className='singleSpot-guests-dropdown-type-right'>
                                      <i className="fa fa-minus-circle add-sub-button"
                                        onClick={() => setAdults(adults - 1)}
                                      />
                                      <p className='singleSpot-guests-p'>{adults}</p>
                                      <i className="fa fa-plus-circle add-sub-button"
                                        onClick={() => setAdults(adults + 1)}
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
                                        onClick={() => setChildren(children - 1)}
                                      />
                                      <p className='singleSpot-guests-p'>{children}</p>
                                      <i className="fa fa-plus-circle add-sub-button"
                                        onClick={() => setChildren(children + 1)}
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
                                        onClick={() => setInfants(infants - 1)}
                                      />
                                      <p className='singleSpot-guests-p'>{infants}</p>
                                      <i className="fa fa-plus-circle add-sub-button"
                                        onClick={() => setInfants(infants + 1)}
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
            </div>
            
            <div id='singleSpot-reviews-container'>
              <ReviewsComponent spotId={parseInt(spotId)} />
            </div>
            
          </div>
        </div>
    );
};

export default SingleSpot;
