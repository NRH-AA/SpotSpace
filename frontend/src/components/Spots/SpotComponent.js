import { Link, useHistory } from "react-router-dom";
import "./SpotComponent.css";

const SpotComponent = ({spot}) => {
    const history = useHistory();

    const ClickedSpotDiv = (spotId) => history.push(`/spots/${spotId}`);

    return (
        <div className="spotLink"
            onClick={() => ClickedSpotDiv(spot.id)}
        >
            <img className="allSpots-img" src={spot.previewImage} alt={spot.name}></img>
                    
            <div className="allSpots-info-div">
                <p className="allSpots-p">{spot.city + ", " + spot.state}</p>
                <p className="allSpots-p-2">⭐ {spot?.avgRating > 0 ? spot.avgRating : 'New'}</p>
            </div>
                    
            <div className="allSpots-price-div">   
                <p className="allSpots-p"><b>${spot.price}</b> Night</p>
            </div>
        </div>
    );
};

export default SpotComponent;