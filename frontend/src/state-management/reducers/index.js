import { combineReducers } from 'redux';
import authReducer, { initialState as authState } from './authReducer';
import errorReducer, { initialState as errorState } from './errorReducer';

export const initialState = { ...authState, ...errorState };

export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});
