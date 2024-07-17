import { combineReducers } from 'redux';
import receipts from './receipts';
import members from './members';

export default combineReducers({ receipts, members });
