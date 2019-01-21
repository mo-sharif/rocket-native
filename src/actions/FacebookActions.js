// import { AsyncStorage } from 'react-native';
import { Facebook } from "expo";
import { Firebase, FirebaseRef } from "../lib/firebase";
import statusMessage from "./status";

import fb from "../constants/facebook";
// import { emailChanged, passwordChanged, signupUser } from '../actions';

export function facebookSignin() {
  return async dispatch => {
    await statusMessage(dispatch, "loading", true);

    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      fb.appId,
      {
        permissions: ["public_profile", "email"]
      }
    );

    if (type === "cancel") {
      return await statusMessage(dispatch, "error", "Login Canceled");
    }

    try {
  /*     await Firebase.auth().setPersistence(
        Firebase.auth.Auth.Persistence.LOCAL
      ); // Set persistent auth state */
      const credential = Firebase.auth.FacebookAuthProvider.credential(token);
      let user = await Firebase.auth().signInAndRetrieveDataWithCredential(
        credential
      );
      /* let emailcheck = await FirebaseRef.child(`/users/${user.user.uid}/userDetails/email`).on('value');
        let emailcheckflag = emailcheck.val(); */
//console.log(user)
      if (!user) return false;
      const ref = FirebaseRef.child(`users/${user.user.uid}`);

      return ref.on("value", snapshot => {
        const userData = snapshot.val() || [];

        // update user properties to Firebase
        FirebaseRef.child(`/users/${user.user.uid}`).update({
          email: user.user.email,
          displayName: user.user.displayName,
          avatar: user.additionalUserInfo.photoURL,
          firstName: user.additionalUserInfo.profile.first_name,
          lastName: user.additionalUserInfo.profile.last_name,
        });
        return dispatch({
          type: "USER_DETAILS_UPDATE",
          data: userData
        });
      });
    } catch (error) {
      console.log("fb_actions.js:line50:error");
      console.log(error);
      let err_message = error.message;

      await statusMessage(dispatch, "loading", false);
      await statusMessage(dispatch, "error", err_message);
    }
    // await AsyncStorage.setItem('fb_token', token);
    /*     if (emailcheckflag) {
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
      } else {
        // case where the user has signed in without signing up.
        await Firebase.auth().signOut();
        dispatch({ type: ERROR_SET, payload: 'Please Register first ...'});
      } */
  };
}

export const facebookSignup = ({ email, phone, firstname, lastname }) => {
  return async dispatch => {
    console.log(fb.appId);

    dispatch({
      type: "LOGIN_STATUS_CHANGED",
      payload: "fbchecking"
    });

    let { type, token } = await Facebook.logInWithReadPermissionsAsync(
      fb.appId,
      {
        permissions: ["public_profile", "email"]
      }
    );

    console.log(credential);
    if (type === "cancel") {
      dispatch({
        type: "LOGIN_STATUS_CHANGED",
        payload: "fbloginfailed"
      });
      return dispatch({ type: "FACEBOOK_LOGIN_FAIL" });
    }

    const credential = Firebase.auth.FacebookAuthProvider.credential(token);
    console.log(token);

    try {
      let user = await Firebase.auth().signInWithCredential(credential);
      console.log(user);
      console.log(user.user.email);
      var displayName = firstname + " " + lastname;
      console.log(email);
      console.log(displayName);
      // write user properties to Firebase
      FirebaseRef.child(`/users/${user.user.uid}/userDetails`).set({
        email: email,
        phone: phone,
        firstname: firstname,
        lastname: lastname,
        displayName: displayName,
        fbEmail: user.user.email,
        fbDisplayName: user.user.displayName,
        fbPhotoURL: user.user.photoURL
      });
      await statusMessage(dispatch, "success", true);
    } catch (error) {
      console.log(error);
      dispatch({
        type: "LOGIN_STATUS_CHANGED",
        payload: "notloggedin"
      });
      let err_message = error.message;
      await statusMessage(dispatch, "error", err_message);
    }
    // await AsyncStorage.setItem('fb_token', token);
    dispatch({ type: "FACEBOOK_LOGIN_SUCCESS", token });
  };
};
