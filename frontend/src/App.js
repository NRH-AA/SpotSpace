import { Route, Switch } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useEffect, useState } from 'react';

import * as sessionActions from "./store/session";
import SpotComponent from './components/Spots';
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
        <Switch>
          <Route exact path="/">
            <SpotComponent />
          </Route>
          
          <Route path="/become-a-host/:page">
            <CreateSpotWrapper />
          </Route>
          
          <Route path="/spots/current">
            <UserSpotsComponent />
          </Route>
          
          <Route path="/spots/new">
            <CreateSpotModal />
          </Route>
          
          <Route path="/spots/:spotId">
            <SingleSpot />
          </Route>
          
          <Route path="/reviews/current">
            <UserReviews />
          </Route>
          
          <Route path='/'>
            <SpotComponent />
          </Route>
          
          
        </Switch>
      )}
    </>
  );
};

export default App;
