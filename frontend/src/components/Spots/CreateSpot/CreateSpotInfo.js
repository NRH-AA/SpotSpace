import { useHistory } from 'react-router-dom';
import GoogleMapComponent from '../../GoogleMaps';
import CreateSpotNightSlider from './xSlider';
import CreateSpotComponent from './CreateSpotComponent';
import './CreateSpotInfo.css';
import Logo from '../../Navigation/images/logo.png';

const CreateSpotInfo = () => {
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
                    <p style={{fontSize: "14.5px"}}>Ready to SpotSpace it?</p>
                    <button className='main-button-style cs-info-setup-button'
                        onClick={() => history.push('/become-a-host/a100')}
                    >SpotSpace Setup</button>
                </div>
            </div>
            
            <div id='cs-info-earnings-div'>
                <CreateSpotNightSlider />
            </div>
            
            <div id='cs-info-gmaps-div'>
                <div id='cs-info-type-div'>
                    <i className="fa-solid fa-magnifying-glass cs-info-magnifying-glass"/>
                    <div>
                        <p className='cs-info-type-p1'>Location</p>
                        <p className='cs-info-type-p'>Type * Guests</p>
                    </div>
                </div>
                <br></br>
                <GoogleMapComponent heightt='380px' widtht='100%'/>
            </div>
            
            
            <div style={{width: '100%', margin: 'auto'}}>
                <p 
                style={{
                    marginTop: '45px',
                    fontSize: "28px"
                }}
                >SpotSpace it easily with SpotSpace Setup</p>
                <img 
                    style={{width: '98%', margin: 'auto'}}
                    src='https://a0.muscache.com/im/pictures/65214d06-ffb4-4b70-93c0-01d368e76649.jpg?'
                />
            </div>
            
            
            <div id='cs-info-text-div'>
                <div style={{width: '95%'}}>
                    <h3 className='cs-info-text-h3'>One-to-one guidance from a Superhost</h3>
                    <p className='cs-info-text-p'>We’ll match you with a Superhost in your area, who’ll guide you from your first question to your first guest—by phone, video call, or chat.</p>
                </div>
                
                <div style={{width: '95%'}}>
                    <h3 className='cs-info-text-h3'>An experienced guest for your first booking</h3>
                    <p className='cs-info-text-p'>For your first booking, you can choose to welcome an experienced guest who has at least three stays and a good track record on SpotSpace.</p>
                </div>
                
                <div style={{width: '95%'}}>
                    <h3 className='cs-info-text-h3'>Specialized support from SpotSpace</h3>
                    <p className='cs-info-text-p'>New Hosts get one-tap access to specially trained Community Support agents who can help with everything from account issues to billing support.</p>
                </div>
            </div>
            
            <div id='cs-info-aircover'>
                <img 
                    style={{height: '65px', width: '180px'}}
                    src='https://a0.muscache.com/im/pictures/5318dacc-6476-4195-8dd2-b9a66fa2efbb.jpg?'
                />
                <h2>SpotSpace it with top‑to‑bottom protection</h2>
                
                
                
                
            </div>
            
        </div>
    );
};

export default CreateSpotInfo;
