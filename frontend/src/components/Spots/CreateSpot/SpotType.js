import { useHistory } from 'react-router-dom';
import Logo from '../../Navigation/images/logo.png';
import './SpotType.css';

const SpotTypeComponent = () => {
    const history = useHistory();
    
    const spotTypes = [
        {text: "House", icon: 'fa-solid fa-house cs-type-house'},
        {text: "Apartment", icon: ''},
        {text: "Barn", icon: ''},
        {text: "Bed & Breakfast", icon: ''},
        {text: "Boat", icon: ''},
        {text: "Cabin", icon: ''},
        {text: "Camper/RV", icon: ''},
        {text: "Casa particular", icon: ''},
        {text: "Castle", icon: ''},
        {text: "Cave", icon: ''},
        {text: "Container", icon: ''},
        {text: "Cycladic home", icon: ''},
        {text: "Dammuso", icon: ''},
        {text: "Dome", icon: ''},
        {text: "Earth home", icon: ''},
        {text: "Farm", icon: ''},
        {text: "Guesthouse", icon: ''},
        {text: "Hotel", icon: ''},
        {text: "Houseboat", icon: ''},
        {text: "Kezhan", icon: ''},
        {text: "Minsu", icon: ''},
        {text: "Riad", icon: ''},
        {text: "Ryokan", icon: ''},
        {text: "Shepherd's hut", icon: ''},
        {text: "Tent", icon: ''},
        {text: "Tiny home", icon: ''},
        {text: "Tower", icon: ''},
        {text: "Treehouse", icon: ''},
        {text: "Trullo", icon: ''},
        {text: "Windmill", icon: ''},
        {text: "Yurt", icon: ''}
    ]
    
    
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
                    {spotTypes.map((el, i) => <div key={i} className='cs-type-items-item'>
                        <div className='cs-types-type-div'>
                            <i className={el.icon}/>
                            <p className='cs-types-type-p'>{el.text}</p>
                        </div>
                    </div>)}
                
                </div>
            </div>
            
            
            
        </div>
    );
};

export default SpotTypeComponent;
