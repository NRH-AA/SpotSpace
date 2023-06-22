import { useHistory, useParams } from 'react-router-dom';
import ProgressBar from "@ramonak/react-progress-bar";
import Logo from '../../Navigation/images/logo.png';
import './SpotType.css';

const CreateSpotWrapper = () => {
    const history = useHistory();
    const { progress } = useParams();
    
    
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
            
            
            
            
            <div id='cs-footer'>
                <ProgressBar completed={progress} />
            </div>
            
        </div>
    );
};

export default CreateSpotWrapper;
