
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
    SEND_CHANGE_PASS_EMAIL_REQUEST, SEND_CHANGE_PASS_EMAIL_SUCCESS, SEND_CHANGE_PASS_EMAIL_FAILURE,
    VERIFY_CHANGE_PASS_REQUEST, VERIFY_CHANGE_PASS_SUCCESS, VERIFY_CHANGE_PASS_FAILURE,
    RESET_PASS_REQUEST, RESET_PASS_SUCCESS, RESET_PASS_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS, 
    SIGNUP_FAILURE, VERIFY_EMAIL_REQUEST, VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_FAILURE, VERIFY_OTP_REQUEST, 
    VERIFY_OTP_SUCCESS, VERIFY_OTP_FAILURE
} from '../types/auth.js';
const initialState = {
    signup: {
        user: null,
        loading: false,
        success: false,
        error: null
    },
    verifyEmail: {
        email: null,
        loading: false,
        success: false,
        error: null
    },
    verifyOTP: {
        loading: false,
        success: false,
        error: null
    },
    login: {
        user: null,
        loading: false,
        success: false,
        error: null
    },
    sendChangePassEmail: {
        email: null,
        loading: false,
        success: false,
        error: null
    },
    verifyChangePass: {
        loading: false,
        success: false,
        error: null
    },
    resetPass: {
        loading: false,
        success: false,
        error: null
    }
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        
        //signup reducers
        case SIGNUP_REQUEST:
            return { ...state, signup: { loading: true, success: false, error: null } };
        case SIGNUP_SUCCESS:
            return { ...state, signup: { loading: false, user: action.payload, success: true, error: null } };
        case SIGNUP_FAILURE:
            return { ...state, signup: { loading: false, success: false, error: action.error } };

        //verifyEmail reducers
        case VERIFY_EMAIL_REQUEST:
            return { ...state, verifyEmail: { loading: true, success: false, error: null } };
        case VERIFY_EMAIL_SUCCESS:
            return { ...state, verifyEmail: { email: action.payload.email, loading: false, success: true, error: null } };
        case VERIFY_EMAIL_FAILURE:
            return { ...state, verifyEmail: { loading: false, success: false, error: action.error } };

        //verifyOTP reducers
        case VERIFY_OTP_REQUEST:
            return { ...state, verifyOTP: { loading: true, success: false, error: null } };
        case VERIFY_OTP_SUCCESS:
            return { ...state, verifyOTP: { loading: false, success: true, error: null } };
        case VERIFY_OTP_FAILURE:
            return { ...state, verifyOTP: { loading: false, success: false, error: action.error } };

        // login reducers
        case LOGIN_REQUEST:
            return { ...state, login: { loading: true, success: false, error: null } };
        case LOGIN_SUCCESS:
            return { ...state, login: { loading: false, user: action.payload, success: true, error: null } };
        case LOGIN_FAILURE:
            return { ...state, login: { loading: false, success: false, error: action.error } };

        // send change password email reducers
            case SEND_CHANGE_PASS_EMAIL_REQUEST:
            return { ...state, sendChangePassEmail: { loading: true, success: false, error: null } };
        case SEND_CHANGE_PASS_EMAIL_SUCCESS:
            return { ...state, sendChangePassEmail: { email: action.payload.email, loading: false, success: true, error: null } };
        case SEND_CHANGE_PASS_EMAIL_FAILURE:
            return { ...state, sendChangePassEmail: { loading: false, success: false, error: action.error } };

        // verify change password reducers
        case VERIFY_CHANGE_PASS_REQUEST:
            return { ...state, verifyChangePass: { loading: true, success: false, error: null } };
        case VERIFY_CHANGE_PASS_SUCCESS:
            return { ...state, verifyChangePass: { loading: false, success: true, error: null } };
        case VERIFY_CHANGE_PASS_FAILURE:
            return { ...state, verifyChangePass: { loading: false, success: false, error: action.error } };

        // reset password reducers
        case RESET_PASS_REQUEST:
            return { ...state, resetPass: { loading: true, success: false, error: null } };
        case RESET_PASS_SUCCESS:
            return { ...state, resetPass: { loading: false, success: true, error: null } };
        case RESET_PASS_FAILURE:
            return { ...state, resetPass: { loading: false, success: false, error: action.error } };

        default:
            return state;
    }
};

export default authReducer;