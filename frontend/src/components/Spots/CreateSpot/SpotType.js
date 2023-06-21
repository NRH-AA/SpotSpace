import { useHistory } from 'react-router-dom';
import Logo from '../../Navigation/images/logo.png';
import './SpotType.css';

const SpotTypeComponent = () => {
    const history = useHistory();
    
    return (
        <div id="cs-info-wrapper">
            <div id='cs-info-nav'>
                <img 
                    style={{height: '55px', width: '65px', marginLeft: '0px'}}
                    className="logoImg" 
                    src={Logo} alt="logo"
                    onClick={() => history.push('/')}
                />
                <div id='cs-info-nav-div'>
                    <button
                    
                    >Questions?</button>
                    
                    <button
                    
                    >Save & exit</button>
                </div>
            </div>
            
            
            
        </div>
    );
};

export default SpotTypeComponent;
