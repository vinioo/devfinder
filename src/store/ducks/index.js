import { combineReducers } from 'redux';

import users from './users';
import error from './error';

export default combineReducers([users, error]);
