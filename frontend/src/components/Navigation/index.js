import { NavLink } from 'react-router-dom';
// import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ProfileButton from './ProfileButton';
// import OpenModalButton from "../OpenModalButton";
// import CreateSpotModal from '../Spots/CreateSpot/CreateSpotModal';
import './Navigation.css';
import Logo from './images/logo.png';

function Navigation({ isLoaded }){
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  return (
      <div id='navbar-sticky'>
        <div className="topbar">
            <div className="topbar-home">
                <img className="logoImg" src={Logo} alt="logo"
                  onClick={() => history.push('/')}
                />
                
                {/* <input id='nav-searchbar'
                  placeholder='Search Spots'
                /> */}
              
            </div>
            
            <div className="topbar-profile">
              {sessionUser && (
                  <NavLink className='create-spot'
                    to='/spots/new'
                  >SpotSpace your home</NavLink>
              )}
              
              {isLoaded && (
                  <ProfileButton user={sessionUser} />
              )}
            </div>
        </div>
      </div>
  );
}

export default Navigation;
