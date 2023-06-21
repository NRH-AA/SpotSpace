import { useHistory } from 'react-router-dom';
import Logo from '../../Navigation/images/logo.png';
import './SpotType.css';

const SpotTypeComponent = () => {
    const history = useHistory();
    
    return (
        <div id="cs-type-wrapper">
            <div id='cs-type-nav'>
                <img 
                    style={{height: '55px', width: '65px', marginLeft: '0px'}}
                    className="logoImg" 
                    src={Logo} alt="logo"
                    onClick={() => history.push('/')}
                />
                <div id='cs-info-nav-div'>
                    <button className='main-button-style cs-type-nav-button'
                    
                    >Questions?</button>
                    
                    <button className='main-button-style cs-type-nav-button'
                        
                    >Save & exit</button>
                </div>
            </div>
            
            <div id='cs-type-center-div'>
                <p className='cs-type-center-p'>Which of these best describes your space?</p>
                
                <div id='cs-type-items-div'>
                    <div className='cs-type-items-item'>
                        
                    </div>
                    <div className='cs-type-items-item'>
                        
                    </div>
                    <div className='cs-type-items-item'>
                        
                    </div>
                    <div className='cs-type-items-item'>
                        
                    </div>
                    <div className='cs-type-items-item'>
                        
                    </div>
                    <div className='cs-type-items-item'>
                        
                    </div>
                    <div className='cs-type-items-item'>
                        
                    </div>
                    <div className='cs-type-items-item'>
                        
                    </div>
                    
                    
                </div>
            </div>
            
            
            
        </div>
    );
};

export default SpotTypeComponent;
