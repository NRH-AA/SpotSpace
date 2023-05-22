import { useSelector } from 'react-redux';
import DefaultProfilePicture from '../../../images/default_profile_picture.jpg';

const AmenitiesComponant = () => {
    const spot = useSelector(state => state.spots.singleSpot);
    
    return <div id='singleSpot-middle-amenities'>
        <div id='singleSpot-amenities-title'>
        <h2>Spot Type</h2>
        <img id='singleSpot-anemities-title-img'
            src={spot?.Owner?.profilePicture ? spot?.Owner?.profilePicture : DefaultProfilePicture} 
            alt={spot?.Owner?.firstName}
            title={`${spot?.Owner?.firstName}'s picture`}
        />
        </div>
        {spot?.amenities ? 
            <div id='singleSpot-amenities-items'>
                {spot?.amenities.split(',').map((el, i) => <div key={i} className='singleSpot-amenities-item'>
                <p className='singleSpot-amenity-item-p'>{el}</p>
                </div>)}
            </div>
        : null}
    </div>
};

export default AmenitiesComponant;
