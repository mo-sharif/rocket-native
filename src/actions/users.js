import { Firebase, FirebaseRef } from "../lib/firebase";

/**
 * Reset a Users in Redux (eg for logou)
 */
export function resetUsers(dispatch) {
  return dispatch({
    type: "ALL_USERS",
    data: []
  });
}
/**
 * Set an Error Message
 */
export function setError(message) {
  return dispatch =>
    new Promise(resolve =>
      resolve(
        dispatch({
          type: "USERS_ERROR",
          data: message
        })
      )
    );
}

/**
 * Get Users
 */
export function getUsers() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch =>
    new Promise(resolve =>
      FirebaseRef.child("users").limitToFirst(100).on("value", snapshot => {
        const users =
          Object.keys(snapshot.val()).map(user => snapshot.val()[user]) || [];
          return resolve(
          dispatch({
            type: "ALL_USERS",
            data: users
          })
        );
      })
    ).catch(e => console.log(e));
}
