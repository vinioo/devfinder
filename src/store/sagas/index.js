import { all, takeLatest } from 'redux-saga/effects';

import { Types as UsersTypes } from '../ducks/users';
import { findUser } from './users';


export default function* rootSaga() {
    yield all([
        takeLatest(UsersTypes.FIND_REQUEST, findUser)
    ]);
}
