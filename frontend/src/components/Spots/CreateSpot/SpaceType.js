import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ProgressBar from "@ramonak/react-progress-bar";
import './SpaceType.css';

const SpaceTypeComponent = ({ completed, selection }) => {
    const history = useHistory();
    const { progress, spotType } = useParams();
    const [newSelection, setNewSelection] = useState('');
    const [newProgress, setNewProgress] = useState(completed);
    
    
    const spaceTypeOptions = [
        {title: 'An entire place', desc: 'Guests have the whole place to themselves.'},
        {title: 'A room', desc: 'Guests have their own room in a home, plus access to shared spaces'},
        {title: 'A shared room', desc: 'Guests sleep in a room or common area that may be shared with you or others.'}
    ];
    
    return (
        <>
        <div id='cs-space-type-center-div'>
            <p className='cs-space-type-center-p'>What type of place will guests have?</p>
            
            <div id='cs-space-type-options-div'>
                {spaceTypeOptions.map((el, i) => <div key={i}>
                    <p>{el.title}</p>
                    <p>{el.desc}</p>
                </div>)}
            </div>
            
        </div>
        
        <div id='cs-footer'>
            <ProgressBar completed={progress ? progress : completed}
                customLabel=' '
                bgColor='#00f000'
                height='5px'
            />
                
            <div id='cs-footer-button-div'>
                <button id='cs-footer-back-button'
                    onClick={() => history.push(`/become-a-host/0`)}
                >Back</button>
                    
                <button id='cs-footer-next-button' className='main-button-style'
                    disabled={!selection}
                    onClick={() => history.push(`/become-a-host/${progress}/${selection}`)}
                >Next</button>
            </div>
            
        </div>
        
        </>
    );
};

export default SpaceTypeComponent;
