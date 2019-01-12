import Store from '../store/users';

export const initialState = Store;

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'ALL_USERS': {
      let users = []
      if (action.data && typeof action.data === 'object') {
        users = action.data.map(user => ({
          firstName: user.firstName,
          lastName: user.lastName
        }
        ));
      }
      // Pick out the props I need

      return {
        ...state,
        error: null,
        loading: false,
        users: users
      };
    }
    case 'USERS_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }
    default:
    return state;
  }
}