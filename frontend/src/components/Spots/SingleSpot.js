import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSpot } from "../../store/spots";
import ReviewsComponent from "../Reviews";
import OpenModalButton from "../OpenModalButton";
import DeleteSpotModal from "../DeleteSpotModal";
import UpdateSpotModal from "../UpdateSpotModal";
import MarkDownComponant from "../MarkdownComponent";
import BookingsModal from "../BookingsModal";
import './SingleSpot.css';

const SingleSpot = () => {
      const dispatch = useDispatch();
      const { spotId } = useParams();
      const spotsState = useSelector(state => state.spots.singleSpot);
      const userState = useSelector(state => state.session.user);
      
      const [spot, setSpot] = useState(spotsState?.id ? spotsState : null);
      const [spotImages, setSpotImages] = useState(spot?.SpotImages || null);
      const [spotOwner, setSpotOwner] = useState(spot?.Owner || null);
      
      useEffect(() => {
        if (!spotsState) dispatch(getSpot(parseInt(spotId)));
        if (!spot) setSpot(spotsState);
        if (!spotImages) setSpotImages(spot?.SpotImages || null);
        if (!spotOwner) setSpotOwner(spot?.Owner || null);
      }, [dispatch, spotId, spot, spotsState, spotImages, spotOwner]);
      
      
      function getPreviewImage() {
          if (spotImages) {
          for (let img of spotImages) {
            if (img.preview) return img;
          }
          }
          return null;
      }
      
      function isSpotImage(url) {
        if (spotImages) {
        for (let img of spotImages) {
          if (url === img.url) return true;
        }
        }
        return false;
      }
      
      const [preview, setPreview] = useState(null);
      
      useEffect(() => {
        if (!preview?.url || !isSpotImage(preview?.url)) setPreview(getPreviewImage());
      }, [preview, spotImages]);
      
      const getStarReviewsText = () => {
          if (!spot) return ('');
          if (spot.numReviews === 1) return `${spot?.avgStarRating + ' ·'}  ${spot?.numReviews} Review`;
          if (spot.numReviews === 0) return ` New`;
          return `${spot?.avgStarRating + ' ·'}  ${spot?.numReviews} Reviews`
      }
      
      if (!spot) return null;
    
    return (
        <div id="singleSpot-wrapper">
          <div id="singleSpot-inner-div">
            
            <div id="singleSpot-title-div">
              <div>
                <h2 className="singleSpot-h2">{spot?.name?.toUpperCase()}</h2>
                <p>{spot?.city?.toUpperCase() + ", " + spot?.state?.toUpperCase() + ", " + spot?.country?.toUpperCase()}</p>
              </div>
              
            </div>
            
            
            <div className="spot-images-div">
              <div className="previewImg-div">
                  <NavLink to={{pathname: preview?.url}} target="_blank">
                    <img className="previewImg" src={preview?.url} alt={`Preview`}/>
                  </NavLink>
              </div>
              
              <div className="images-div">
              {spotImages?.map((img, i) => 
                  <img className="images-a" 
                    key={img.id} 
                    src={img.url} 
                    alt={`Spot ${i}`}
                    onClick={() => setPreview(img)}
                  />
              )}
              </div>
            </div>
            
            
            {(spot?.ownerId === userState?.id) &&
              <div id="singleSpot-edit-buttons-div">
                <OpenModalButton
                    spotId={spot?.id}
                    className="singleSpots-edit-button"
                    buttonText={<i className="fa-solid fa-pen-to-square singleSpot-edit-square"/>}
                    modalComponent={<UpdateSpotModal />}
                />

                <OpenModalButton
                    spotId={spot?.id}
                    className="singleSpots-delete-button"
                    buttonText={<i className="fa fa-trash singleSpot-delete-trash"/>}
                    modalComponent={<DeleteSpotModal />}
                />
              </div>
            }
            
            <div className="spot-desc-div">
              <div>
              <h2 id="singleSpot-owner-h2">{'Hosted by ' + spotOwner?.firstName + ' ' + spotOwner?.lastName}</h2>
                {/* <p>{spotsState?.description}</p> */}
                <MarkDownComponant text={spot?.description}/>
              </div>
              
              {spot?.ownerId !== userState?.id &&
                <div className="spot-reserve">
                  <div id="spot-reserve-div">
                    
                    <div id="spot-reserve-text">
                      <p><span id="spot-reserve-span">{"$" + spot?.price}</span> {' night'}</p>
                      <b>⭐{getStarReviewsText()}</b>
                    </div>
                    
                    {/* <button id="spot-reserve-button" className='main-button-style' onClick={() => alert('Feature not implimented.')}>Reserve</button> */}
                    <OpenModalButton
                      className="spot-reserve-button main-button-style"
                      buttonText='Reserve'
                      modalComponent={<BookingsModal spotId={spot?.id}/>}
                    />
                  
                  
                  </div>
                </div>
              }
            </div>
            
            <div>
              <ReviewsComponent spotId={parseInt(spotId)} />
            </div>
            
          </div>
        </div>
    );
};

export default SingleSpot;
