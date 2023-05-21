import { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import CreateSpotModal from "../Spots/CreateSpot/CreateSpotModal";
import './ProfileButton.css';
import ProfileMenu from './images/menu.png';
import ProfileImage from './images/profile_button.png';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    setShowMenu(false);
    dispatch(sessionActions.logout());
    return history.push("/");
  };
  
  const showFeatureComingSoon = () => {
    alert('Feature coming soon.');
  }

  const ulClassName = showMenu ? "profile-dropdown-flex" : "profile-dropdown";

  return (
    <>
        <button className="profile-button" onClick={openMenu}>
          <div className="profile-menu-div">
            <img className="profile-menu-img" src={ProfileMenu} alt="profile menu"></img>
            <img className="profile-button-img" src={ProfileImage} alt="profile menu"></img>
          </div>
        </button>
        
      <div className={ulClassName} hidden={showMenu ? false : true} ref={ulRef}>
        {user ? (
          <div className='profile-menu-inner-div'>
            
            <div className='div-border-bottom'>
              <p className='profile-menu-p'><NavLink className="user-spots-link" to='/'
                onClick={() => {setShowMenu(false); showFeatureComingSoon()}}
              >Messages</NavLink></p>
              
              <p className='profile-menu-p'><NavLink className="user-spots-link" to='/'
                onClick={() => {setShowMenu(false); showFeatureComingSoon()}}
              >Notifications</NavLink></p>
              
              <p className='profile-menu-p'><NavLink className="user-spots-link" to='/'
                onClick={() => {setShowMenu(false); showFeatureComingSoon()}}
              >Trips</NavLink></p>
              
              <p className='profile-menu-p'><NavLink className="user-spots-link" to='/'
                onClick={() => {setShowMenu(false); showFeatureComingSoon()}}
              >Wishlists</NavLink></p>
            </div>
            
            <div className='div-border-bottom'>
              <p className='profile-menu-p'>
              <OpenModalButton
                  className="user-spots-link create-spot-profile-button"
                  buttonText='SpotSpace your home'
                  modalComponent={<CreateSpotModal />}
              />
              </p>
              
              <p className='profile-menu-p'><NavLink className="user-spots-link" to="/spots/current"
                  onClick={() => setShowMenu(false)}
              >Manage Spots</NavLink></p>
            </div>
            
            <p className='profile-menu-p'><NavLink className="user-spots-link" to="/"
                onClick={logout}
            >Log Out</NavLink></p>

          </div>
        ) : (
          <div className='profile-menu-inner-div'>
            <div>
              <OpenModalButton
                className="main-button-style profile-dropdown-button"
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
                onButtonClick={() => setShowMenu(false)}
              />
              </div>
            <div>
              <OpenModalButton
                className="main-button-style profile-dropdown-button"
                buttonText="Log In"
                modalComponent={<LoginFormModal />}
                onButtonClick={() => setShowMenu(false)}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
