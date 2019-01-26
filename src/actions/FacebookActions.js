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
      /*    await Firebase.auth().setPersistence(
        Firebase.auth.Auth.Persistence.LOCAL
      ); // Set persistent auth state */
      const credential = Firebase.auth.FacebookAuthProvider.credential(token);
      let user = await Firebase.auth().signInAndRetrieveDataWithCredential(
        credential
      );
      let emailcheck = await FirebaseRef.child(
        `/users/${user.user.uid}/userDetails/email`
      ).once("value");
      let emailcheckflag = emailcheck.val();
      console.log("emailcheckflag" + emailcheckflag);
      if (!user) return false;
      const ref = FirebaseRef.child(`users/${user.user.uid}`);

       ref
        .once("value")
        .then(snapshot => {
          const userData = snapshot.val() || [];
          // update user properties to Firebase
           FirebaseRef.child(`/users/${user.user.uid}`)
            .update({
              email: user.user.email,
              displayName: user.user.displayName,
              avatar: user.user.photoURL,
              firstName: user.additionalUserInfo.profile.first_name,
              lastName: user.additionalUserInfo.profile.last_name
            })
            .then(
              dispatch({
                type: "USER_DETAILS_UPDATE",
                data: userData
              })
            );
        })
        .then(async () => await statusMessage(dispatch, "loading", false))
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log("fb_actions.js:line50:error");
      console.log(error);
      let err_message = error.message;

      await statusMessage(dispatch, "loading", false);
      await statusMessage(dispatch, "error", err_message);
    }
  
  };
}