import Store from "../store/social";

export const initialState = Store;

export default function socialReducer(state = initialState, action) {
  switch (action.type) {
    case "FACEBOOK_LOGIN_SUCCESS":
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: null,
          token: action.data
        };
      }
      return initialState;
    case "FACEBOOK_LOGIN_FAIL":
      return {
        ...state,
        loading: false,
        error: null,
        token: null
      };
    default:
      return state;
  }
}
