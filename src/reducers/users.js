import Store from '../store/users';

export const initialState = Store;

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'ALL_USERS': {
      return {
        ...state,
        error: null,
        loading: false,
        users: action.data,
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
