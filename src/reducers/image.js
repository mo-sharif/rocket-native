import Store from "../store/image";

export const initialState = Store;

export default function imageReducer(state = initialState, action) {
  switch (action.type) {
    case "IMAGE_UPLOAD": {
      if (action.data) {
        console.log('action.data' + action.data)
        return {
          ...state,
          loading: false,
          error: null,
          image: action.data
        };
      }
      return initialState;
    }

    case "IMAGE_UPLOADING": {
      if (action.data) {
        return {
          ...state,
          loading: true,
          error: null
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
