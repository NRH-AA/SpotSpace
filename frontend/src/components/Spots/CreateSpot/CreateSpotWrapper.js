import { useHistory, useParams } from 'react-router-dom';
import SpotTypeComponent from './SpotType';
import SpaceTypeComponent from './SpaceType';
import Logo from '../../Navigation/images/logo.png';
import './SpotType.css';

const CreateSpotWrapper = () => {
    const history = useHistory();
    const { progress } = useParams();
    const progressInt = parseInt(progress);
    
    return (
        <div id="cs-wrapper">
            <div id='cs-nav'>
                <img 
                    style={{height: '55px', width: '65px', marginLeft: '0px'}}
                    className="logoImg" 
                    src={Logo} alt="logo"
                    onClick={() => history.push('/')}
                />
                <div id='cs-nav-div'>
                    <button className='main-button-style cs-nav-button'
                    
                    >Questions?</button>
                    
                    <button className='main-button-style cs-nav-button'
                        
                    >Save & exit</button>
                </div>
            </div>
            
            {progressInt === 0 && <SpotTypeComponent completed={progress} />}
            {progressInt === 5 && <SpaceTypeComponent completed={progress} />}
            
        </div>
    );
};

export default CreateSpotWrapper;
