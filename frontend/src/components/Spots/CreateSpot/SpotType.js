import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { updateCSData } from "../../../store/session";
import ProgressBar from "@ramonak/react-progress-bar";
import './SpotType.css';

const SpotTypeComponent = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const createSpotInfo = useSelector(state => state.session.createSpot);
    const [selection, setSelection] = useState(createSpotInfo && createSpotInfo.spotType || '');
    
    const spotTypes = [
        {text: "House", icon: 'fa-solid fa-house cs-type-icon'},
        {text: "Apartment", icon: 'fa-solid fa-city cs-type-icon'},
        {text: "Barn", icon: 'fa-solid fa-house cs-type-icon'},
        {text: "Bed & Breakfast", icon: 'fa-solid fa-house cs-type-icon'},
        {text: "Boat", icon: 'fa-solid fa-ship cs-type-icon'},
        {text: "Cabin", icon: 'fa-solid fa-house cs-type-icon'},
        {text: "Camper/RV", icon: 'fa-solid fa-caravan cs-type-icon'},
        {text: "Casa particular", icon: 'fa-solid fa-house cs-type-icon'},
        {text: "Castle", icon: 'fa-brands fa-fort-awesome cs-type-icon'},
        {text: "Cave", icon: 'fa-solid fa-house cs-type-icon'},
        {text: "Container", icon: 'fa-solid fa-box cs-type-icon'},
        {text: "Cycladic home", icon: 'fa-solid fa-house cs-type-icon'},
        {text: "Dammuso", icon: 'fa-solid fa-house cs-type-icon'},
        {text: "Dome", icon: 'fa-solid fa-igloo cs-type-icon'},
        {text: "Earth home", icon: 'fa-solid fa-earth-americas cs-type-icon'},
        {text: "Farm", icon: 'fa-solid fa-wheat-awn cs-type-icon'},
        {text: "Guesthouse", icon: 'fa-solid fa-people-roof cs-type-icon'},
        {text: "Hotel", icon: 'fa-solid fa-hotel cs-type-icon'},
        {text: "Houseboat", icon: 'fa-solid fa-ferry cs-type-icon'},
        {text: "Kezhan", icon: 'fa-solid fa-house cs-type-icon'},
        {text: "Minsu", icon: 'fa-solid fa-house cs-type-icon'},
        {text: "Riad", icon: 'fa-solid fa-house cs-type-icon'},
        {text: "Ryokan", icon: 'fa-solid fa-house cs-type-icon'},
        {text: "Shepherd's hut", icon: 'fa-solid fa-house cs-type-icon'},
        {text: "Tent", icon: 'fa-solid fa-tent cs-type-icon'},
        {text: "Tiny home", icon: 'fa-solid fa-house-chimney-window cs-type-icon'},
        {text: "Tower", icon: 'fa-solid fa-tower-observation cs-type-icon'},
        {text: "Treehouse", icon: 'fa-solid fa-tree-city cs-type-icon'},
        {text: "Trullo", icon: 'fa-solid fa-house cs-type-icon'},
        {text: "Windmill", icon: 'fa-solid fa-wind cs-type-icon'},
        {text: "Yurt", icon: 'fa-solid fa-house cs-type-icon'}
    ]
    
    const selectionOnClick = (item) => {
        if (selection === item.text)  {
            setSelection('');
            return dispatch(updateCSData({spotType: '', progress: 0}));
        };
        setSelection(item.text);
        return dispatch(updateCSData({spotType: item.text, progress: 5}));
    };
    
    useEffect(() => {
        if (!createSpotInfo) dispatch(updateCSData({progress: 0}));
    }, [createSpotInfo])
    
    if (!createSpotInfo) return null;
    
    return (
        <>
        <div id='cs-type-center-div'>
            <p className='cs-type-center-p'>Which of these best describes your space?</p>
                
            <div id='cs-type-items-div'>
                {spotTypes.map((el, i) => <div key={i} 
                    className={el.text === createSpotInfo.spotType ? 'cs-type-items-item-selected' : 'cs-type-items-item'}
                    onClick={() => selectionOnClick(el)}
                >
                    <div className='cs-types-type-div'>
                        <i className={el.icon}/>
                        <p className='cs-types-type-p'>{el.text}</p>
                    </div>
                </div>)}
                
            </div>
            
        </div>
        
        <div id='cs-footer'>
            <ProgressBar completed={createSpotInfo.progress <= 5 ? createSpotInfo.progress : 5}
                customLabel=' '
                bgColor='#00f000'
                height='5px'
            />
                
            <div id='cs-footer-button-div'>
                <button id='cs-footer-back-button'
                    onClick={() => history.push('/spots/new')}
                >Back</button>
                    
                <button id='cs-footer-next-button' className='main-button-style'
                    disabled={!selection}
                    onClick={() => history.push(`/become-a-host/spaceType`)}
                >Next</button>
            </div>
            
        </div>
        
        </>
    );
};

export default SpotTypeComponent;
