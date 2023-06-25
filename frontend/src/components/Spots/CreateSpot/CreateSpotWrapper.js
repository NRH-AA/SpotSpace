import { useHistory, useParams } from 'react-router-dom';
import SpotTypeComponent from './SpotType';
import SpaceTypeComponent from './SpaceType';
import SpotLocationComponent from './SpotLocation';
import Logo from '../../Navigation/images/logo.png';
import './SpotType.css';

const CreateSpotWrapper = () => {
    const history = useHistory();
    const { page } = useParams();
    
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
            
            {page === 'spotType' && <SpotTypeComponent />}
            {page === 'spaceType' && <SpaceTypeComponent />}
            {page === 'location' && <SpotLocationComponent />}
            
        </div>
    );
};

export default CreateSpotWrapper;
