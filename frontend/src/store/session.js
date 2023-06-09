import { csrfFetch } from './csrf';

const SESSION_LOGIN = 'session/LOGIN';
const SESSION_LOGOUT = 'session/LOGOUT';
const UPDATE_CS_DATA = 'session/UPDATE_CS_DATA';


// Actions
const sessionLogin = (user) => ({
    type: SESSION_LOGIN,
    user
});

export const sessionLogout = () => ({
    type: SESSION_LOGOUT
});

export const updateCSData = (data) => ({
    type: UPDATE_CS_DATA,
    data
});


// Thunk Actions
export const login = (user) => async dispatch => {
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    
    if (res.ok) {
        const data = await res.json();
        dispatch(sessionLogin(data.user));
    };
    
    return res;
};

export const restoreUser = () => async dispatch => {
    const res = await csrfFetch('/api/session');
    const data = await res.json();
    dispatch(sessionLogin(data.user));
    return res;
};

export const signup = (user) => async dispatch => {
    const res = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    
    if (res.ok) {
        const data = await res.json();
        dispatch(sessionLogin(data.user));
    }
    
    return res;
};

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(sessionLogout());
    return response;
};


export const getUserState = (state) => state.session.user;

// Selectors
const initialState = { user: null, createSpot: null }
const sessionReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
    case SESSION_LOGIN:
        newState.user = action.user;
        return newState;
        
    case SESSION_LOGOUT:
        newState.user = null;
        return newState;
      
    case UPDATE_CS_DATA:
        newState.createSpot = {...newState.createSpot, ...action.data};
        return newState;
        
    default:
        return state;
    }
}
  
export default sessionReducer;
  