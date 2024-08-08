import { combineReducers } from 'redux';
import receipts from './receipts';
import members from './members';
import authReducer from './auth';

export default combineReducers({ receipts, members, authReducer });
