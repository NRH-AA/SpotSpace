import { useSelector } from 'react-redux';

const AmenitiesComponant = () => {
    const spot = useSelector(state => state.spots.singleSpot);
    
    const items = ['amenity1', 'amenity2', 'amenity3', 'amenity4', 'amenity5', 'amenity6'];
    
    return <div id='singleSpot-middle-amenities'>
        <div id='singleSpot-amenities-title'>
        <h2>Spot Type</h2>
        {spot?.Owner?.profilePicture && <img id='singleSpot-anemities-title-img'
            src={spot?.Owner?.profilePicture} 
            alt={spot?.Owner?.firstName}
            title={`${spot?.Owner?.firstName}'s picture`}
        />}
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
