
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpotReviews } from '../../store/reviews'
import OpenModalButton from "../OpenModalButton";
import CreateReviewModal from "./CreateReview";
import DeleteReviewModal from "./DeleteReview";
import UpdateReviewModal from "./UpdateReview";
import './Reviews.css';
import Star from './images/star.png';
import DefaultProfilePicture from '../../images/default_profile_picture.jpg';

const ReviewsComponent = ({ spotId }) => {
    const dispatch = useDispatch();
    const reviewData = useSelector(state => state.reviews.spot);
    const spotData = useSelector(state => state.spots.singleSpot);
    const userData = useSelector(state => state.session.user);
    
    useEffect(() => {
        dispatch(getSpotReviews(spotId))
    }, [dispatch, spotId])
    
    if (!spotId || !reviewData) return null;
    if (reviewData && reviewData[0]?.spotId !== parseInt(spotId)) return null;
    
    const formatDate = (date) => {
        let newDate = date.slice(0, 10).split('-').reverse();
        const month = newDate[0];
        const day = newDate[1];
        newDate[0] = day;
        newDate[1] = month;
        return newDate.join('/');
    }
    
    const getStarReviewsText = () => {
        if (!spotData) return ('');
        if (spotData.numReviews === 1) return `${spotData?.avgStarRating + ' ·'}  ${spotData?.numReviews} Review`;
        if (spotData.numReviews === 0) return ` New`;
        return `${spotData?.avgStarRating + ' ·'}  ${spotData?.numReviews} Reviews`
    }
    
    function getStars(num) {
        const starImgs = [];
        for (let i = 1; i <= num; i++) {
            starImgs.push(<img className='review-star-img' key={i} src={Star} alt='star'/>)
        }
        return starImgs;
    };
    
    const showPostReview = () => {
        if (reviewData) {
            for (let i in reviewData) {
                if (reviewData[i].userId === userData.id) return false;
            }
        }
        return true;
    };
    
    return (
        <div id="reviews-wrapper">  
            <h3>⭐ {getStarReviewsText()}
            
            {spotData?.ownerId !== userData?.id ? 
                <>  
                    {userData ?
                        <>
                        {showPostReview() ?
                            <div>
                                <OpenModalButton
                                    spotId={spotId}
                                    className="create-review-button"
                                    buttonText="Post Your Review"
                                    modalComponent={<CreateReviewModal />}
                                />
                            </div> 
                        : ''}
                        
                        {spotData?.numReviews === 0 ? 
                            <p>Be the first to post a review</p>
                        : ''}
                        </>
                    : <p>Log in to post a review</p>}
                </>
            :(!reviewData?.length) && <p>Your spot has no reviews yet</p>}
            
            </h3>
            
            {reviewData?.map(el => {
            return (
                <div key={el.id}>
                    <div id="reviews-stars-div">
                        <div id='reviews-stars-flex'>
                            <img className='reviews-user-img'
                                src={el.User?.profilePicture ? el.User?.profilePicture : DefaultProfilePicture}
                                alt={el.User?.firstName}
                            />
                            
                            <div>
                                <p className="reviews-name-p">
                                    {el.User?.firstName}
                                </p>
                                
                                <div className='reviews-star-date-div'>
                                    {el.stars && getStars(el.stars)}
                                    <span className="reviews-date-p">
                                        <ul>
                                            <li>{formatDate(el.updatedAt)}</li>
                                        </ul>
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        {el?.userId === userData?.id ?
                            <div className="reviews-button-div">
                                <OpenModalButton
                                    spotId={el.id}
                                    className="reviews-button"
                                    buttonText={<i className="fa-solid fa-pen-to-square singleSpot-edit-square"/>}
                                    modalComponent={<UpdateReviewModal spotId={spotId}/>}
                                />
                                <OpenModalButton
                                    spotId={el.id}
                                    className="reviews-button reviews-delete-button"
                                    buttonText={<i className="fa fa-trash singleSpot-delete-trash"/>}
                                    modalComponent={<DeleteReviewModal spotId={spotId}/>}
                                />
                            </div>
                        : ''}
                        
                    </div>
                
                    <p className="reviews-review-p">{el.review}</p>
                    
                </div>
            )})}
        </div>
    );
}


export default ReviewsComponent;
