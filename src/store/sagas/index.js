import { all, takeLatest } from 'redux-saga/effects';

import { Types as UsersTypes } from '../ducks/users';
import { findUser } from './users';


// import { getPlaylists } from './playlists';
// import { getPlaylistDetails } from './playlistDetails';

export default function* rootSaga() {
    yield all([
        takeLatest(UsersTypes.FIND_REQUEST, findUser)
    ]);
}
