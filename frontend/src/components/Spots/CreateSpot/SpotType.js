import { useHistory } from 'react-router-dom';
import Logo from '../../Navigation/images/logo.png';
import './SpotType.css';

const SpotTypeComponent = () => {
    const history = useHistory();
    
    const spotTypes = [
        {text: "House", img: ''},
        {text: "Apartment", img: ''},
        {text: "Barn", img: ''},
        {text: "Bed & Breakfast", img: ''},
        {text: "Boat", img: ''},
        {text: "Cabin", img: ''},
        {text: "Camper/RV", img: ''},
        {text: "Casa particular", img: ''},
        {text: "Castle", img: ''},
        {text: "Cave", img: ''},
        {text: "Container", img: ''},
        {text: "Cycladic home", img: ''},
        {text: "Dammuso", img: ''},
        {text: "Dome", img: ''},
        {text: "Earth home", img: ''},
        {text: "Farm", img: ''},
        {text: "Guesthouse", img: ''},
        {text: "Hotel", img: ''},
        {text: "Houseboat", img: ''},
        {text: "Kezhan", img: ''},
        {text: "Minsu", img: ''},
        {text: "Riad", img: ''},
        {text: "Ryokan", img: ''},
        {text: "Shepherd's hut", img: ''},
        {text: "Tent", img: ''},
        {text: "Tiny home", img: ''},
        {text: "Tower", img: ''},
        {text: "Treehouse", img: ''},
        {text: "Trullo", img: ''},
        {text: "Windmill", img: ''},
        {text: "Yurt", img: ''}
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
                        <p>{el.text}</p>
                        
                    </div>)}
                
                </div>
            </div>
            
            
            
        </div>
    );
};

export default SpotTypeComponent;
