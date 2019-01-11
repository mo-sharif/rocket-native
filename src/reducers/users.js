import Store from '../store/users';

export const initialState = Store;

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_USERS': {
      let users = []
      if (action.data && typeof action.data === 'object') {
        users = action.data.map(user => ({
          firstName: user.firstName,
          lastName: item.lastName
        }));
      }
      // Pick out the props I need

      return {
        ...state,
        error: null,
        loading: false,
        users,
      };
    }
    case 'MEALS_REPLACE': {
      return {
        ...state,
        error: null,
        loading: false,
        meals: action.data,
      };
    }
    case 'USERS_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }
    case 'RECIPES_REPLACE': {
      let users = [];

      // Pick out the props I need
      if (action.data && typeof action.data === 'object') {
        users = action.data.map(item => ({
          id: item.id,
          title: item.title,
          body: item.body,
          category: item.category,
          image: item.image,
          author: item.author,
          ingredients: item.ingredients,
          method: item.method,
        }));
      }

      return {
        ...state,
        error: null,
        loading: false,
        users,
      };
    }
    default:
      return state;
  }
}
