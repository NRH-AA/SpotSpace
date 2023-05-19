import { useSelector } from 'react-redux';
import './SingleSpotImages.css';

const SingleSpotImagesComponant = () => {
    const spot = useSelector(state => state.spots.singleSpot);
    
    return (spot?.SpotImages?.length === 1) ?
            <img
                id='singleSpot-previewImg-only' 
                src={spot?.previewImage?.url}
            />
        : (spot?.SpotImages?.length === 2) ?
            <div className='singleSpot-images-container'>
                <img
                    className='singleSpot-duo-image' 
                    src={spot?.SpotImages[0]?.url}
                />
                <img
                    className='singleSpot-duo-image' 
                    src={spot?.SpotImages[1]?.url}
                />
            </div>
        : (spot?.SpotImages?.length >= 3) ? 
            <div className='singleSpot-images-container'>
                <img
                    className='singleSpot-duo-image' 
                    src={spot?.previewImage?.url}
                />
                <div id='singleSpot-images-div'>
                    {spot?.SpotImages?.map((el, i) =>
                        <img key={i} className='singleSpot-image'
                            src={el.url}
                            alt='Spot'
                        />
                    )}
                </div>
            
            </div>
        
        : null
};

export default SingleSpotImagesComponant;
