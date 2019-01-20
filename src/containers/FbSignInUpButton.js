import React, { Component } from 'react';
import { View, Dimensions, Image } from 'react-native';

import { connect } from 'react-redux';

import {
  Button,
  Text,
} from 'native-base';

import { facebookSignin, facebookSignup } from '../actions/FacebookActions';


class FbSignInUpButton extends Component {

  _pressSignInUp() {
    if (this.props.emailPwdBtnStr == 'SignIn') {
        facebookSignin();
    } else {
      const { email, phone, firstname, lastname } = this.props;
      facebookSignup({ email, phone, firstname, lastname });
    }
  }

  render() {

    return (
      <View>
        <Button  onPress={() => { this._pressSignInUp(); }}>
          <Text>
              Login With Facebook
          </Text>
        </Button>
      </View>
    );
  }
}

/* const mapStateToProps = ({ auth }) => {
  const { email, phone, firstname, lastname, loginStatus, } = auth;
  return { email, phone, firstname, lastname, loginStatus, };
};
 */
/* export default connect(mapStateToProps, {
  facebookSignin, facebookSignup
})(FbSignInUpButton); */

export default FbSignInUpButton