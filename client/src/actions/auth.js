
import * as api from '../api';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
         SEND_CHANGE_PASS_EMAIL_REQUEST, SEND_CHANGE_PASS_EMAIL_SUCCESS, SEND_CHANGE_PASS_EMAIL_FAILURE,
         VERIFY_CHANGE_PASS_REQUEST, VERIFY_CHANGE_PASS_SUCCESS, VERIFY_CHANGE_PASS_FAILURE,
         RESET_PASS_REQUEST, RESET_PASS_SUCCESS, RESET_PASS_FAILURE, 
         SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE, 
         VERIFY_EMAIL_REQUEST, VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_FAILURE, 
         VERIFY_OTP_REQUEST, VERIFY_OTP_SUCCESS, VERIFY_OTP_FAILURE,
         VERIFY_TOKEN_REQUEST, VERIFY_TOKEN_SUCCESS, VERIFY_TOKEN_FAILURE
 } from '../types/auth.js';

// name, email, pass, confirmpass

export const signup = (name, email, password, confirmPassword) => async (dispatch) => {
  
    dispatch({ type: SIGNUP_REQUEST });

    try {
        const { data } = await api.signup(name, email, password, confirmPassword);
        console.log(data)
        dispatch({ type: SIGNUP_SUCCESS, payload: data });
        return { type: SIGNUP_SUCCESS, payload: data }
    } catch (error) {
        dispatch({ type: SIGNUP_FAILURE, error: error.response.data.message });
        return { type: SIGNUP_FAILURE, error: error.response.data.message }
    }
};
export const verifyEmail = (email) => async (dispatch) => {
    dispatch({ type: VERIFY_EMAIL_REQUEST });

    try {
        const { data } = await api.sendOTPVerificationEmail(email);
        dispatch({ type: VERIFY_EMAIL_SUCCESS, payload: { data, email } });
        return { type: VERIFY_EMAIL_SUCCESS, payload: { data, email } }
    } catch (error) {
        dispatch({ type: VERIFY_EMAIL_FAILURE, error: error.response.data.message });
        return { type: VERIFY_EMAIL_FAILURE, error: error.response.data.message }
    }
}; 

export const verifyOTP = (userId, verifyOTP) => async (dispatch) => {
    dispatch({ type: VERIFY_OTP_REQUEST });

    try {
        const { data } = await api.verifyEmail(userId, verifyOTP);
        dispatch({ type: VERIFY_OTP_SUCCESS, payload: data });
        return { type: VERIFY_OTP_SUCCESS, payload: data }
    } catch (error) {
        dispatch({ type: VERIFY_OTP_FAILURE, error: error.response.data.message });
        return { type: VERIFY_OTP_FAILURE, error: error.response.data.message }
    }
};

 export const login = (email, password) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    
    try {
        const { data } = (await api.login(email, password));
        dispatch({ type: LOGIN_SUCCESS, payload: data });
        return { type: LOGIN_SUCCESS, payload: data };
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, error: error.response.data.message });
        return { type: LOGIN_FAILURE, error: error.response.data.message };
    }
};

export const sendChangePasswordEmail = (email) => async (dispatch) => {
    dispatch({ type: SEND_CHANGE_PASS_EMAIL_REQUEST });

    try {
        const { data } = await api.sendChangePassword(email);
        dispatch({ type: SEND_CHANGE_PASS_EMAIL_SUCCESS, payload: { data, email } });
        return { type: SEND_CHANGE_PASS_EMAIL_SUCCESS, payload: { data, email } };
    } catch (error) {
        dispatch({ type: SEND_CHANGE_PASS_EMAIL_FAILURE, error: error.response.data.message });
        return { type: SEND_CHANGE_PASS_EMAIL_FAILURE, error: error.response.data.message };
    }
}

export const verifyChangePassword = (resetCode) => async (dispatch) => {
    dispatch({ type: VERIFY_CHANGE_PASS_REQUEST });

    try {
        const { data } = await api.verifyChangePassword(resetCode);
        console.log(data)
        dispatch({ type: VERIFY_CHANGE_PASS_SUCCESS, payload: data });
        return { type: VERIFY_CHANGE_PASS_SUCCESS, payload: data };
    } catch (error) {
        dispatch({ type: VERIFY_CHANGE_PASS_FAILURE, error: error.response.data.message });
        return { type: VERIFY_CHANGE_PASS_FAILURE, error: error.response.data.message };
    }
}

export const resetPassword = (password, confirmPassword) => async (dispatch) => {
    dispatch({ type: RESET_PASS_REQUEST });

    try {
        const { data } = await api.resetPassword(password, confirmPassword);
        dispatch({ type: RESET_PASS_SUCCESS, payload: data });
        return { type: RESET_PASS_SUCCESS, payload: data };
    } catch (error) {
        dispatch({ type: RESET_PASS_FAILURE, error: error.response.data.message });
        return { type: RESET_PASS_FAILURE, error: error.response.data.message };
    }
}

export const verifyToken = (token) => async (dispatch) => {
    dispatch({ type: VERIFY_TOKEN_REQUEST });

    try {
        const { data } = await api.verifyToken(token);
        dispatch({ type: VERIFY_TOKEN_SUCCESS, payload: data });
        return { type: VERIFY_TOKEN_SUCCESS, payload: data};
    } catch (error) {
        dispatch({ type: VERIFY_TOKEN_FAILURE, error: error.message });
        return { type: RESET_PASS_FAILURE, error: error.message };
    }
}