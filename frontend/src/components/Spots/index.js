import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from '../../store/spots';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import Navigation from "../Navigation";
import SpotComponent from "./SpotComponent";
import SpotTypesComponent from "./SpotTypesComponent";
import './Spots.css';

const SpotsComponent = () => {
    const dispatch = useDispatch();
    const spotsState = useSelector(state => state.spots.allSpots);
    const [offset, setOffset] = useState(0);
    const [isUpdating, setIsUpdating] = useState(false);
    
    useEffect(() => {
        if (!spotsState) dispatch(getAllSpots({offset}));
    }, [dispatch, spotsState, offset]);
    
    const handleScroll = async () => {
        if (isUpdating) return;
        const scollable = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;

        if (Math.ceil(scrolled) >= Math.ceil(scollable)) {
            const newOffset = offset + 1;
            setIsUpdating(true);
            await dispatch(getAllSpots({offset: newOffset}));
            setOffset(newOffset);
            setIsUpdating(false);
        };
    };
    
    useBottomScrollListener(handleScroll);
    
    if (!spotsState) return null;
    
    return (<>
        <Navigation isLoaded={true}/>
        
        <div id='allSpots-main-wrapper'>

            <SpotTypesComponent />

            <div id="allSpots-wrapper">
                {spotsState?.map((spot, i) =>
                    <SpotComponent key={i} spot={spot}/>
                )}
            </div>

        </div>
    </>);
};

export default SpotsComponent;
