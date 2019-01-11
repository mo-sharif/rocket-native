import { Firebase, FirebaseRef } from '../lib/firebase';

/**
  * Get Users
  */
/* export function getUsers(dispatch) {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  const UID = Firebase.auth().currentUser.uid;

  if (!UID) return false;

  const ref = FirebaseRef.child(`users`);

  return ref.on('value', (snapshot) => {
    const usersData = snapshot.val() || [];
    console.log('🛑🛑' + JSON.stringify(usersData))
    return dispatch({
      type: 'GET_USERS',
      data: usersData,
    });
  });
} */

/**
  * Reset a Users in Redux (eg for logou)
  */
export function resetUsers(dispatch) {
  return dispatch({
    type: 'GET_USERS',
    data: [],
  });
}

/**
  * Update My Favourites Recipes
  */
/* export function replaceFavourites(newFavourites) {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  const UID = Firebase.auth().currentUser.uid;
  if (!UID) return false;

  return () => FirebaseRef.child(`favourites/${UID}`).set(newFavourites);
} */

/**
  * Get Meals
  */
/* export function getMeals() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise((resolve, reject) => FirebaseRef
    .child('meals').once('value')
    .then((snapshot) => {
      const meals = snapshot.val() || [];

      return resolve(dispatch({
        type: 'MEALS_REPLACE',
        data: meals,
      }));
    }).catch(reject)).catch(e => console.log(e));
} */

/**
  * Set an Error Message
  */
export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'USERS_ERROR',
    data: message,
  })));
}

/**
  * Get Users
  */
export function getUsers() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise(resolve => FirebaseRef.child('users')
    .on('value', (snapshot) => {
      const users = Object.keys(snapshot.val())
      .map(user => snapshot.val()[user]) || [];
      return resolve(dispatch({
        type: 'GET_USERS',
        data: users,
      }));
    })).catch(e => console.log(e));
}
