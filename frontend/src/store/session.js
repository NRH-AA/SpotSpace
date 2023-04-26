import { csrfFetch } from './csrf';

const SESSION_LOGIN = 'session/LOGIN';
const SESSION_LOGOUT = 'session/LOGOUT';


// Actions
const sessionLogin = (user) => ({
    type: SESSION_LOGIN,
    user
});

export const sessionLogout = () => ({
    type: SESSION_LOGOUT
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

export const getGoogleAPIThunk = () => async () => {
    const res = await csrfFetch('/api/session/googleMapApi');
    if (res.ok) {
        const data = await res.json();
        return data;
    }
    return false;
}


export const getUserState = (state) => state.session.user;

// Selectors
const initialState = { user: null }
const sessionReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
    case SESSION_LOGIN:
        newState.user = action.user;
        return newState;
        
    case SESSION_LOGOUT:
        newState.user = null;
        return newState;
      
    default:
        return state;
    }
}
  
export default sessionReducer;
  