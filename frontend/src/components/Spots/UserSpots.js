import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserSpots } from '../../store/spots';
import OpenModalButton from "../OpenModalButton";
import Navigation from "../Navigation";
import DeleteSpotModal from "../DeleteSpotModal";
import UpdateSpotModal from "../UpdateSpotModal";
import './Spots.css';

const UserSpotsComponent = () => {
    const dispatch = useDispatch();
    const userSpots = useSelector(state => state.spots.userSpots);
    
    useEffect(() => {
        if (!userSpots) dispatch(getUserSpots());
    }, [dispatch, userSpots]);
    
    // const getStateAbb = (state) => {
    //     const split = state.split(' ');
    //     if (split[1]) {
    //         return `${split[0][0]}${split[1][0]}`.toUpperCase();
    //     }
    //     return state.slice(0, 2).toUpperCase();
    // }
    
    return (
        <>
        <Navigation isLoaded={true}/>
        <h2 style={{marginLeft: 20}}>Manage Spots</h2>
        <p style={{marginLeft: 20, fontSize: 18}}>{userSpots?.length === 0 ? 'You have no spots yet' : ''}</p>
        <div id="allSpots-wrapper">
            {userSpots?.map(spot => 
                <Link key={spot.id} className="spotLink" to={"/spots/" + spot.id}>
                    <img className="allSpots-img" src={spot.previewImage} alt={spot.name}></img>
                    
                    <div className="allSpots-info-div">
                        <p className="allSpots-p">{spot.city + ", " + spot.state}</p>
                        <p className="allSpots-p-2">{'⭐' + spot.avgRating}</p>
                    </div>
                    
                    <div className="allSpots-price-div">   
                        <p className="allSpots-p"><b>{"$" + spot.price}</b> 
                        {` night`}
                        </p>
                        
                        <div className='userSpots-update-buttons-div'>
                            <OpenModalButton
                                spotId={spot.id}
                                className="main-button-empty"
                                buttonText={<i className="fas fa-edit allSpots-update-button"/>}
                                modalComponent={<UpdateSpotModal />}
                            />

                            <OpenModalButton
                                spotId={spot.id}
                                className="main-button-empty"
                                buttonText={<i className="fa fa-trash allSpots-delete-button"/>}
                                modalComponent={<DeleteSpotModal />}
                            />
                        </div>
                    </div>
            </Link>
            )}
        </div>
        </>
    );
};

export default UserSpotsComponent;
