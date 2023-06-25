import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateCSData } from '../../../store/session';
import ProgressBar from "@ramonak/react-progress-bar";
import GoogleMapComponent from '../../GoogleMaps';
import './SpotLocation.css';

const SpotLocationComponent = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const createSpotInfo = useSelector(state => state.session.createSpot);
    const [selection, setSelection] = useState('');
    
    const selectionOnChange = (val) => {
        if (val === '') {
            setSelection('');
            return dispatch(updateCSData({location: '', progress: 15}));
        }
        
        setSelection(val);
        return dispatch(updateCSData({location: val, progress: 30}));
    };
    
    return (
        <>
        <div id='cs-space-type-center-div'>
            <p className='cs-location-center-p'>Where's your place located?</p>
            <p className='cs-location-cetner-p2'>Your address is only shared with guests after they've made a reservation.</p>
            
            <div style={{height:'70vh', width: '70vw', marginTop: '100px', position: 'relative'}}>
                <GoogleMapComponent heightt='80%' widtht='70%'/>
                <input id='cs-spot-location-gmap-input'
                    type='text' 
                    placeholder='Enter your address'
                    value={selection}
                    onChange={(e) => selectionOnChange(e.target.value)}
                />
            </div>
            
        </div>
        
        <div id='cs-footer'>
            <ProgressBar completed={createSpotInfo.progress <= 30 ? createSpotInfo.progress : 30}
                customLabel=' '
                bgColor='#00f000'
                height='5px'
            />
                
            <div id='cs-footer-button-div'>
                <button id='cs-footer-back-button'
                    onClick={() => history.push(`/become-a-host/spaceType`)}
                >Back</button>
                    
                <button id='cs-footer-next-button' className='main-button-style'
                    disabled={!selection}
                    onClick={() => history.push(`/become-a-host/todo`)}
                >Next</button>
            </div>
            
        </div>
        
        </>
    );
};

export default SpotLocationComponent;
