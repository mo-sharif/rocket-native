import Store from '../store/posts';

export const initialState = Store;

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case 'NEW_POST': {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: null,
          posts: action.data
        };
      }
      return initialState;
    }

    case 'GET_ALL_POSTS': {
        let posts = [];
        // Pick out the props I need
        if (action.data && typeof action.data === 'object') {
          posts = action.data.map(item => ({
            postTitle: item.postTitle,
            postBody: item.postBody,
          }));
        }
  
        return {
          ...state,
          error: null,
          loading: false,
          posts: posts,
        };
      }
    case 'POST_ERROR': {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: action.data,
        };
      }
      return initialState;
    }
    case 'POST_RESET': {
      return initialState;
    }
    default:
      return state;
  }
}
