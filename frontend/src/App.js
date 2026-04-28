import { Routes, Route } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useEffect, useState } from 'react';

import * as sessionActions from "./store/session";
import SpotsComponent from './components/Spots';
import SingleSpot from './components/Spots/SingleSpot/SingleSpot';
import UserSpotsComponent from './components/Spots/UserSpots';
import UserReviews from './components/Reviews/UserReviews';
import CreateSpotModal from './components/Spots/CreateSpot/CreateSpotInfo';
import CreateSpotWrapper from './components/Spots/CreateSpot/CreateSpotWrapper';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
      dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  
  return (
    <>
      {isLoaded && (
        <Routes>
          <Route path="/" element={<SpotsComponent />} />
          <Route path="/become-a-host/:page" element={<CreateSpotWrapper />} />
          <Route path="/spots/current" element={<UserSpotsComponent />} />
          <Route path="/spots/new" element={<CreateSpotModal />} />
          <Route path="/spots/:spotId" element={<SingleSpot />} />
          <Route path="/reviews/current" element={<UserReviews />} />
        </Routes>
      )}
    </>
  );
};

export default App;
