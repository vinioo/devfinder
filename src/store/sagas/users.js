import { call, put } from 'redux-saga/effects';
import API from '../../services/api';

import { Creators as UsersActions } from '../ducks/users';

export function* findUser(action) {

  try { 
    const response = yield call(
      API.get,
      `https://api.github.com/users/${action.payload.username}`
    );
    yield put(UsersActions.findUserSuccess({data: response.data,...action.payload.coords}));
  } catch (error) {
    yield put(
      console.log('erro')
    );
  }
}
