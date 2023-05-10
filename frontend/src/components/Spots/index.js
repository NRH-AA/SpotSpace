import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllSpots } from '../../store/spots';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import './Spots.css';

const SpotComponent = () => {
    const dispatch = useDispatch();
    const spotsState = useSelector(state => state.spots.allSpots);
    const [offset, setOffset] = useState(0);
    
    useEffect(() => {
        if (!spotsState) dispatch(getAllSpots({offset}));
    }, [dispatch, spotsState]);
    
    const getStateAbb = (state) => {
        const split = state.split(' ');
        if (split[1]) {
            return `${split[0][0]}${split[1][0]}`.toUpperCase();
        }
        return state.slice(0, 2).toUpperCase();
    }
    
    const handleScroll = () => {
        const scollable = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;

        if (Math.ceil(scrolled) >= Math.ceil(scollable)) {
            const newOffset = offset + 20;
            dispatch(getAllSpots({offset: newOffset}));
            setOffset(newOffset);
        };
    };
    
    useBottomScrollListener(handleScroll);
    
    if (!spotsState) return null;
    
    return (
        <div id="allSpots-wrapper">
            {spotsState?.map((spot, i) => 
            <Link key={i} className={"spotLink"} to={"/spots/" + spot.id}>
                    <img className="allSpots-img" src={spot.previewImage} alt={spot.name}></img>
                    
                    <div className="allSpots-info-div">
                        <p className="allSpots-p">{spot.city.slice(0, 25) + ", " + getStateAbb(spot.state)}</p>
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
