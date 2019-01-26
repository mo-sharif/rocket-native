import Store from "../store/posts";

export const initialState = Store;

export default function postpicReducer(state = initialState, action) {
  switch (action.type) {
    case "IMAGE_UPLOAD": {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: null,
          postPic: action.data
        };
      }
      return initialState;
    }

    case "IMAGE_UPLOAD_ERROR": {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: action.data
        };
      }
      return initialState;
    }

    default:
      return state;
  }
}
