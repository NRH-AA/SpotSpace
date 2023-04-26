import { NavLink } from 'react-router-dom';
// import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import Logo from './images/logo.png';

function Navigation({ isLoaded }){
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);

  return (
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
              <NavLink to="/spots/new" className="create-spot">SpotSpace your home</NavLink>
            )}
            
            {isLoaded && (
                <ProfileButton user={sessionUser} />
            )}
          </div>
      </div>
  );
}

export default Navigation;
