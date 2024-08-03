
import * as api from '../api';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
         SEND_CHANGE_PASS_EMAIL_REQUEST, SEND_CHANGE_PASS_EMAIL_SUCCESS, SEND_CHANGE_PASS_EMAIL_FAILURE,
         VERIFY_CHANGE_PASS_REQUEST, VERIFY_CHANGE_PASS_SUCCESS, VERIFY_CHANGE_PASS_FAILURE,
         RESET_PASS_REQUEST, RESET_PASS_SUCCESS, RESET_PASS_FAILURE
 } from '../types/auth.js';

export const login = (email, password) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    
    try {
        const { data } = await api.login(email, password);
        dispatch({ type: LOGIN_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, error: error.message });
    }
};

export const sendChangePasswordEmail = (email) => async (dispatch) => {
    dispatch({ type: SEND_CHANGE_PASS_EMAIL_REQUEST });

    try {
        const { data } = await api.sendChangePassword(email);
        dispatch({ type: SEND_CHANGE_PASS_EMAIL_SUCCESS, payload: { data, email } });
    } catch (error) {
        dispatch({ type: SEND_CHANGE_PASS_EMAIL_FAILURE, error: error.message });
    }
}

export const verifyChangePassword = (resetCode) => async (dispatch) => {
    dispatch({ type: VERIFY_CHANGE_PASS_REQUEST });

    try {
        const { data } = await api.verifyChangePassword(resetCode);
        dispatch({ type: VERIFY_CHANGE_PASS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: VERIFY_CHANGE_PASS_FAILURE, error: error.message });
    }
}

export const resetPassword = (password, confirmPassword) => async (dispatch) => {
    dispatch({ type: RESET_PASS_REQUEST });

    try {
        const { data } = await api.resetPassword(password, confirmPassword);
        dispatch({ type: RESET_PASS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: RESET_PASS_FAILURE, error: error.message });
    }
}