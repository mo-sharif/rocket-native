import Store from "../store/posts";

export const initialState = Store;

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case "NEW_POST": {
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

    case "GET_ALL_POSTS": {
      let posts = [];
      // Pick out the props I need
      if (action.data && typeof action.data === "object") {
        posts = action.data.map(item => ({
          postTitle: item.postTitle,
          postBody: item.postBody,
          postImg: item.postImg,
          id: item.id
        }));
      }

      return {
        ...state,
        error: null,
        loading: false,
        posts: posts
      };
    }
    case "POST_ERROR": {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: action.data
        };
      }
      return initialState;
    }
    case "POST_RESET": {
      return initialState;
    }
    case "FAVOURITES_REPLACE": {
      return {
        ...state,
        favourites: action.data || []
      };
    }
    case "MEALS_REPLACE": {
      return {
        ...state,
        error: null,
        loading: false,
        meals: action.data
      };
    }
    case "POSTS_ERROR": {
      return {
        ...state,
        error: action.data
      };
    }
    case "POSTS_REPLACE": {
      let posts = [];
      // Pick out the props I need
      if (action.data && typeof action.data === "object") {
        posts = action.data.map(item => ({
          id: item.id,
          title: item.title,
          body: item.body,
          category: item.category,
          image: item.image,
          author: item.author,
          ingredients: item.ingredients,
          method: item.method,
          postImg: item.postImg,
        }));
      }

      return {
        ...state,
        error: null,
        loading: false,
        posts
      };
    }
    default:
      return state;
  }
}
