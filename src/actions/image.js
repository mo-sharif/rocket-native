import ErrorMessages from "../constants/errors";
import statusMessage from "./status";


/**
 * Upload Image action to
 */

export function uploadImage(url) {
  console.log('uploadImage ' + url)

  return dispatch =>
    new Promise(resolve =>
      resolve(
        dispatch({
          type: "IMAGE_UPLOAD",
          data: url
        })
      ).reject(e => console.log(e))
    );
}

/**
 * Set upload to true or false
 */
export function setUploading(message) {
  return dispatch =>
    new Promise(resolve =>
      resolve(
        dispatch({
          type: "IMAGE_UPLOADING",
          data: message
        })
      )
    );
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


/**
 * Reset a Image in Redux (eg for logout)
 */
/* export function resetImage() {
    return dispatch =>
      new Promise(resolve =>
        resolve(
          dispatch({
            type: "IMAGE_UPLOAD",
            data: null
          })
        )
      );
  } */