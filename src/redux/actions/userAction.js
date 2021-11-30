import * as actionTypes from '../types';

import { getAuth } from "firebase/auth";

export const setUser = (user) => async (dispatch) => {
    try {
        await dispatch({ type: actionTypes.SET_USER, payload: user})
    } catch (err) {
        await dispatch({ type: actionTypes.ON_ERROR, payload: err })
    }
}

const logoutSuccess = () => ({
    type: actionTypes.LOGOUT_SUCCESS,
});

export const logoutInitiate = (history) => async (dispatch) => {
    try {
        const auth = getAuth();
        auth.signOut().then(() => {
            dispatch(logoutSuccess());
            alert('LOGOUT SUCCESS')
            history.push('/');
        }).catch((error) => {
            // An error happened.
        });
    } catch (err) {
        console.error(err)
    }
}