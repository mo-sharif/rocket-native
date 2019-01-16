import ErrorMessages from "../constants/errors";
import statusMessage from "./status";
import { Firebase, FirebaseRef } from "../lib/firebase";

/**
 * New Post to Firebase
 */
export function addPost(formData) {
  const { postTitle, postBody } = formData;

  return dispatch =>
    new Promise(async (resolve, reject) => {
      // Validation checks
      if (!postTitle)
        return reject({ message: ErrorMessages.missingPostTitle });
      if (!postBody) return reject({ message: ErrorMessages.missingPostBody });

      await statusMessage(dispatch, "loading", true);

      // Go to Firebase
      // Send user details to Firebase database

      FirebaseRef.child(`posts`)
        .push({
          postTitle,
          postBody,
          postDate: Firebase.database.ServerValue.TIMESTAMP
        })
        .then(() => statusMessage(dispatch, "loading", false).then(resolve));
    }).catch(async err => {
      await statusMessage(dispatch, "loading", false);
      throw err.message;
    });
}
/**
 * Get All Posts from Firebase
 */
export function getPosts() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch =>
    new Promise(resolve =>
      FirebaseRef.child("posts").on("value", snapshot => {
        //const posts = snapshot.val() || [];
        const posts =
          Object.keys(snapshot.val()).map(user => snapshot.val()[user]) || [];
        return resolve(
          dispatch({
            type: "GET_ALL_POSTS",
            data: posts
          })
        );
      })
    ).catch(e => console.log(e));
}
/**
 * Get this User's Favourite Posts
 */
export function getFavourites(dispatch) {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  const UID = Firebase.auth().currentUser.uid;
  if (!UID) return false;

  const ref = FirebaseRef.child(`favourites/${UID}`);

  return ref.on("value", snapshot => {
    const favs = snapshot.val() || [];

    return dispatch({
      type: "FAVOURITES_REPLACE",
      data: favs
    });
  });
}
/**
 * Reset a User's Favourite Posts in Redux (eg for logout)
 */
export function resetFavourites(dispatch) {
  return dispatch({
    type: "FAVOURITES_REPLACE",
    data: []
  });
}
/**
 * Update My Favourites Posts
 */
export function replaceFavourites(newFavourites) {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  const UID = Firebase.auth().currentUser.uid;
  if (!UID) return false;

  return () => FirebaseRef.child(`favourites/${UID}`).set(newFavourites);
}
/*
 * Get Meals
 */
export function getMeals() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch =>
    new Promise((resolve, reject) =>
      FirebaseRef.child("meals")
        .once("value")
        .then(snapshot => {
          const meals = snapshot.val() || [];

          return resolve(
            dispatch({
              type: "MEALS_REPLACE",
              data: meals
            })
          );
        })
        .catch(reject)
    ).catch(e => console.log(e));
}
/**
 * Set an Error Message
 */
export function setError(message) {
  return dispatch =>
    new Promise(resolve =>
      resolve(
        dispatch({
          type: "POSTS_ERROR",
          data: message
        })
      )
    );
}
