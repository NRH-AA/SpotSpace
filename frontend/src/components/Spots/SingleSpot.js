import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSpot } from "../../store/spots";
import ReviewsComponent from "../Reviews";
import OpenModalButton from "../OpenModalButton";
import DeleteSpotModal from "../DeleteSpotModal";
import UpdateSpotModal from "../UpdateSpotModal";
import MarkDownComponant from "../MarkdownComponent";
import './SingleSpot.css';

const SingleSpot = () => {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spotsState = useSelector(state => state.spots.singleSpot);
    const userState = useSelector(state => state.session.user);
    
    
    const spotImages = spotsState?.SpotImages ? [...spotsState?.SpotImages] : null;
    const spotOwner = spotsState?.Owner || null;
    
    useEffect(() => {
      if (spotsState?.id !== parseInt(spotId)) dispatch(getSpot(parseInt(spotId)));
    }, [dispatch, spotId, spotsState])
    
    
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
    
    if (!spotsState || spotsState?.id !== parseInt(spotId)) return null;
    
  const getStarReviewsText = () => {
      if (!spotsState) return ('');
      if (spotsState.numReviews === 1) return `${spotsState?.avgStarRating + ' ·'}  ${spotsState?.numReviews} Review`;
      if (spotsState.numReviews === 0) return ` New`;
      return `${spotsState?.avgStarRating + ' ·'}  ${spotsState?.numReviews} Reviews`
  }
    
    return (
        <div id="singleSpot-wrapper">
          <div id="singleSpot-inner-div">
            
            <div id="singleSpot-title-div">
              <div>
                <h2 className="singleSpot-h2">{spotsState?.name?.toUpperCase()}</h2>
                <p>{spotsState?.city?.toUpperCase() + ", " + spotsState?.state?.toUpperCase() + ", " + spotsState?.country?.toUpperCase()}</p>
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
            
            
            {(spotsState?.ownerId === userState?.id) &&
              <div id="singleSpot-edit-buttons-div">
                <OpenModalButton
                    spotId={spotsState?.id}
                    className="singleSpots-edit-button"
                    buttonText={<i className="fa-solid fa-pen-to-square singleSpot-edit-square"/>}
                    modalComponent={<UpdateSpotModal />}
                />

                <OpenModalButton
                    spotId={spotsState?.id}
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
                <MarkDownComponant text={spotsState?.description}/>
              </div>
              
              {spotsState?.ownerId !== userState?.id &&
                <div className="spot-reserve">
                  <div id="spot-reserve-div">
                    
                    <div id="spot-reserve-text">
                      <p><span id="spot-reserve-span">{"$" + spotsState?.price}</span> {' night'}</p>
                      <b>⭐{getStarReviewsText()}</b>
                    </div>
                    
                    <button id="spot-reserve-button" className='main-button-style' onClick={() => alert('Feature not implimented.')}>Reserve</button>
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
