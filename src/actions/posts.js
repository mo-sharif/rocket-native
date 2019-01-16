import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import { Firebase, FirebaseRef } from '../lib/firebase';

/**
  * New Post to Firebase
  */
export function addPost(formData) {
  const {
    postTitle,
    postBody
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Validation checks
    if (!postTitle) return reject({ message: ErrorMessages.missingPostTitle });
    if (!postBody) return reject({ message: ErrorMessages.missingPostBody });

    await statusMessage(dispatch, 'loading', true);

    // Go to Firebase
        // Send user details to Firebase database

            FirebaseRef.child(`posts`).push({
              postTitle,
              postBody,
              postDate: Firebase.database.ServerValue.TIMESTAMP
            }).then(() => statusMessage(dispatch, 'loading', false).then(resolve));
    
      
  }).catch(async (err) => {
    await statusMessage(dispatch, 'loading', false);
    throw err.message;
  });
}
export function getPosts() {
    if (Firebase === null) return () => new Promise(resolve => resolve());
  
    return dispatch => new Promise(resolve => FirebaseRef.child('posts')
      .on('value', (snapshot) => {
        //const posts = snapshot.val() || [];
       const posts =Object.keys(snapshot.val()).map(user => snapshot.val()[user]) || [];
        return resolve(dispatch({
          type: 'GET_ALL_POSTS',
          data: posts,
        }));
      })).catch(e => console.log(e));
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