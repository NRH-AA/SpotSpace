import { Link } from "react-router-dom";

import "./SpotComponent.css";

const SpotComponent = ({spot}) => {
    return (
        <Link className="spotLink" to={"/spots/" + spot.id}>
            <img className="allSpots-img" src={spot.previewImage} alt={spot.name}></img>
                    
            <div className="allSpots-info-div">
                <p className="allSpots-p">{spot.city + ", " + spot.state}</p>
                <p className="allSpots-p-2">⭐ {spot?.avgRating > 0 ? spot.avgRating : 'New'}</p>
            </div>
                    
            <div className="allSpots-price-div">   
                <p className="allSpots-p"><b>${spot.price}</b> Night</p>
            </div>
        </Link>
    );
};

export default SpotComponent;