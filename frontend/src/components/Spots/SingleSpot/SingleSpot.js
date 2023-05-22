import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSpot } from "../../../store/spots";
import SingleSpotImagesComponant from "./SingleSpotImages";
import AmenitiesComponant from "./AmenitiesComponant";
import BookingComponant from "./BookingComponant";
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
    const userState = useSelector(state => state.session.user);
    
    // Update the store with the correct spot data.
    useEffect(() => {
        dispatch(getSpot(parseInt(spotId)));
    }, [dispatch, spotId]);
    
    // We don't have the spot data or it is the wrong spot data. Don't render the componant.
    if (!spot || spot.id !== parseInt(spotId)) return null;
    
    const detailsText = () => {
      let text = '';
      if (spot.numReviews === 0) text += `⭐ New Spot`
      else text += `⭐${spot.avgStarRating} · ${spot.numReviews} ${spot.numReviews !== 1 ? 'Reviews' : 'Review'}`;
      text += ` ·  ${spot.state}, ${spot.city}, ${spot.country}`
      
      return <p>{text}</p>
    };
    
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
                    <AmenitiesComponant />
                    
                    <div id='singleSpot-middle-about-div'>
                      <p>About this spot</p>
                      <MarkDownComponant text={spot?.description}/>
                    </div>
                    
                </div>
                
                {(spot?.Owner?.id !== userState?.id) &&
                  <BookingComponant />
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
