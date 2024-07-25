import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateCSData } from '../../../store/session';
import ProgressBar from "@ramonak/react-progress-bar";
import './SpaceType.css';

const SpaceTypeComponent = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const createSpotInfo = useSelector(state => state.session.createSpot);
    const [selection, setSelection] = useState(createSpotInfo.spaceType || '');
    
    
    const spaceTypeOptions = [
        {key: 1, title: 'An entire place', desc: 'Guests have the whole place to themselves.'},
        {key: 2, title: 'A room', desc: 'Guests have their own room in a home, plus access to shared spaces'},
        {key: 3, title: 'A shared room', desc: 'Guests sleep in a room or common area that may be shared with you or others.'}
    ];
    
    const selectionOnClick = (item) => {
        if (selection === item.key) {
            setSelection('');
            return dispatch(updateCSData({spaceType: '', progress: 5}));
        }
        
        setSelection(item.key);
        return dispatch(updateCSData({spaceType: item.key, progress: 15}));
    };
    
    if (!createSpotInfo) return history.push('/become-a-host/spotType');
    
    return (
        <div id='cs-space-type-container'>
            <div id='cs-space-type-center-div'>
                <p className='cs-space-type-center-p'>What type of place will guests have?</p>
                
                <div id='cs-space-type-options-div'>
                    {spaceTypeOptions.map((el, i) => 
                    <div key={i} className={createSpotInfo.spaceType === el.key ? 'cs-space-type-item-selected' : 'cs-space-type-item'}
                        onClick={() => selectionOnClick(el)}
                    >
                        <p className='cs-space-type-title'>{el.title}</p>
                        <p className='cs-space-type-desc'>{el.desc}</p>
                    </div>)}
                </div>
                
            </div>
            
            <div id='cs-footer'>
                <ProgressBar completed={createSpotInfo.progress <= 15 ? createSpotInfo.progress : 15}
                    customLabel=' '
                    bgColor='#00f000'
                    height='5px'
                />
                    
                <div>
                    <div id='cs-footer-button-div'>
                        <button id='cs-footer-back-button'
                            onClick={() => history.push(`/become-a-host/spotType`)}
                        >Back</button>
                            
                        <button id='cs-footer-next-button' className='main-button-style'
                            disabled={!selection}
                            onClick={() => history.push(`/become-a-host/location`)}
                        >Next</button>
                    </div>
                </div>
                
            </div>
        
        </div>
    );
};

export default SpaceTypeComponent;
