import status from './status';
import member from './member';
import users from './users';
import locale from './locale';
import posts from './posts';
import social from './social'
import postpic from './postpic'

const rehydrated = (state = false, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return true;
    default:
      return state;
  }
};

export default {
  rehydrated,
  status,
  member,
  users,
  locale,
  posts,
  social,
  postpic
};
