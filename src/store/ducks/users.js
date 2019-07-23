export const Types = {
  ADD_LOCATION: 'user/ADD_LOCATION',
  FIND_REQUEST: 'user/FIND_REQUEST',
  FIND_SUCCESS: 'user/FIND_SUCCESS',
  REMOVE_USER: 'user/REMOVE_USER'
};

const INITIAL_STATE = {
  users: [],
  coords: {},
  loading: false
};

export default function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_LOCATION:
      return { ...state, coords: action.payload.coords };
    case Types.FIND_REQUEST:
      return { ...state, loading: true };
    case Types.FIND_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [...state.users, action.payload.data]
      };
    case Types.REMOVE_USER:
      const newUsers = state.users.filter(
        user => user.id !== action.payload.userId
      );
      return {
        ...state,
        users: newUsers
      };
    default:
      return state;
  }
}

export const Creators = {
  findUserRequest: (username, coords) => ({
    type: Types.FIND_REQUEST,
    payload: { username, coords }
  }),
  findUserSuccess: data => ({
    type: Types.FIND_SUCCESS,
    payload: { data }
  }),
  addUserLocation: coords => ({
    type: Types.ADD_LOCATION,
    payload: { coords }
  }),
  removeUser: userId => ({
    type: Types.REMOVE_USER,
    payload: { userId }
  })
};
