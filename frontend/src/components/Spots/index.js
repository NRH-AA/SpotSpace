import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllSpotsState, getAllSpots } from '../../store/spots';
import './Spots.css';

const SpotComponent = () => {
    const dispatch = useDispatch();
    const spotsState = useSelector(getAllSpotsState);
    
    if (!spotsState) dispatch(getAllSpots());
    
    useEffect(() => {
        if (!spotsState) dispatch(getAllSpots());
    }, [dispatch, spotsState]);
    
    return (
        <div id="allSpots-wrapper">
            {spotsState?.map((spot, i) => 
            <Link key={i} className={"spotLink"} to={"/spots/" + spot.id}>
                    <img className="allSpots-img" src={spot.previewImage} alt={spot.name}></img>
                    
                    <div className="allSpots-info-div">
                        <p className="allSpots-p">{spot.city + ", " + spot.state}</p>
                        <p className="allSpots-p-2">⭐ {spot?.avgRating > 0 ? spot.avgRating : 'New'}</p>
                    </div>
                    
                    <div className="allSpots-price-div">   
                        <p className="allSpots-p"><b>${spot.price}</b> Night</p>
                    </div>
            </Link>
            )}
        </div>
    );
};

export default SpotComponent;
