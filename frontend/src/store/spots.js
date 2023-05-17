import { csrfFetch } from './csrf';

const SET_ALL_SPOTS = 'spots/SET';
const SET_SPOT = 'spot/SET';
const SET_SPOT_BOOKINGS = 'spot/SET_SPOT_BOOKINGS';
const SET_USER_SPOTS = 'spots/SET_USER';
const UPDATE_SPOT = 'spot/UPDATE';
const DELETE_SPOT = 'spot/DELETE';

const setAllSpots = (spots) => ({
    type: SET_ALL_SPOTS,
    spots
});

const setSingleSpot = (spot) => ({
    type: SET_SPOT,
    spot
});

const setSpotBookings = (bookings) => ({
   type: SET_SPOT_BOOKINGS,
   bookings
});

const setUserSpots = (spots) => ({
    type: SET_USER_SPOTS,
    spots
});

const deleteUserSpot = (spotId) => ({
    type: DELETE_SPOT,
    spotId
});



export const getAllSpots = (data) => async dispatch => {
    let url = '/api/spots';
    
    if (data.offset) url += `?page=${data.offset}`;
    
    const res = await csrfFetch(url);
    
    if (res.ok) {
        const data = await res.json();
        dispatch(setAllSpots(data.Spots));  
    };
    return res;
};

export const getSpot = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`);
    
    if (res.ok) {
        const data = await res.json();
        dispatch(setSingleSpot(data)); 
    };
    return res;
};

export const getUserSpots = () => async dispatch => {
  const res = await csrfFetch('/api/spots/current');
  
  if (res.ok) {
    const data = await res.json();
    dispatch(setUserSpots(data));
  }

  return res;
};

export const createSpot = (data, images) => async dispatch => {
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    
    if (res.ok) {
        const spotData = await res.json();
        
        await images.forEach(async image => {
            await csrfFetch(`/api/spots/${spotData.id}/images`, {
                method: 'POST',
                body: JSON.stringify({url: image.url, preview: image.preview})
            });
        });
        
        dispatch(getSpot(spotData.id));
        dispatch(getUserSpots());
        return spotData;
    };
    
    return res;
};

export const updateSpot = (data, images) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
    
    if (res.ok) {
        images.forEach(async image => {
            await csrfFetch(`/api/spots/${data.id}/images`, {
                method: 'POST',
                body: JSON.stringify({url: image.url, preview: image.preview})
            });
        });

        dispatch(getSpot(data.id));
    };
    
    return res;
};

export const deleteSpot = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });
    
    if (res.ok) {
        dispatch(deleteUserSpot(spotId));
        return true;
    }
    
    return false;
};

export const getSpotBookings = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`);
    
    if (res.ok) {
        const data = await res.json();
        dispatch(setSpotBookings(data.Bookings));
    }
    return res;
}

export const createBooking = (spotId, data) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        body: JSON.stringify(data)
    });
    
    if (res.ok) {
        dispatch(getSpot(spotId));
        return true;
    }
    
    return false;
};




export const getSpotsState = (state) => state.spots;
export const getAllSpotsState = (state) => state.spots.allSpots;
export const getSingleSpotState = (state) => state.spots.singleSpot;
export const getSpotRedirect = (state) => state.spots.redirect;
export const getUserSpotsState = (state) => state.spots.userSpots;

const initialState = {
    allSpots: null,
    singleSpot: null,
    bookings: null,
    userSpots: null,
    redirect: null
}
const spotsReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case SET_ALL_SPOTS:
            if (newState.allSpots) newState.allSpots = [...newState.allSpots, ...action.spots];
            else newState.allSpots = [...action.spots];
            return newState;
            
        case SET_SPOT:
            newState.singleSpot = {...action.spot};
            newState.allSpots = null;
            return newState;
            
        case SET_SPOT_BOOKINGS:
            newState.bookings = [...action.bookings]
            return newState;

        case SET_USER_SPOTS:
            newState.allSpots = null;
            newState.userSpots = [...action.spots.Spots];
            return newState;
            
        case UPDATE_SPOT:
            return {};
            
        case DELETE_SPOT:
            newState.userSpots = null;
            return newState;
            
        default:
            return state;
    }
}
  
export default spotsReducer;
