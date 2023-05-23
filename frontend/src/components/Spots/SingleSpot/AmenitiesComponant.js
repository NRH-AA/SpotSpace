import { useSelector } from 'react-redux';
import { useState } from 'react';
import DefaultProfilePicture from '../../../images/default_profile_picture.jpg';

export const AmenitiesComponant = () => {
    const spot = useSelector(state => state.spots.singleSpot);
    
    const amenities = spot?.amenities?.split(',');
    const firstThreeAmenities = [amenities[0], amenities[1], amenities[2]];
    
    return <div id='singleSpot-middle-amenities'>
        <div id='singleSpot-amenities-title'>
        <h2>Spot Type</h2>
        <img id='singleSpot-anemities-title-img'
            src={spot?.Owner?.profilePicture ? spot?.Owner?.profilePicture : DefaultProfilePicture} 
            alt={spot?.Owner?.firstName}
            title={`${spot?.Owner?.firstName}'s picture`}
        />
        </div>
        {firstThreeAmenities ? 
            <div id='singleSpot-amenities-items'>
                {firstThreeAmenities.map((el, i) => <div key={i} className='singleSpot-amenities-item'>
                <p className='singleSpot-amenity-item-p'>{el}</p>
                </div>)}
            </div>
        : null}
    </div>
};

export const AdditionalAmenitiesComponant = () => {
    const spot = useSelector(state => state.spots.singleSpot);
    
    const [show, setShow] = useState(false);
    const amenities = spot?.amenities?.split(',');
    const firstFiveAmenities = [amenities[0], amenities[1], amenities[2], amenities[3], amenities[4]];
    
    return (
        amenities?.length > 3 ? 
            <div id='singleSpot-additional-amenities-container'>
                <h4>What this place offers</h4>
                
                {show && firstFiveAmenities?.map((el, i) => 
                    <p key={i} className='singleSpot-amenities-list-item'>{el}</p>
                )}
                
                
                {!show ? 
                    <button
                        onClick={() => setShow(true)}
                    >Show All {amenities?.length} amenities</button>
                : ''}
            </div>
        
        : null
    )
};
