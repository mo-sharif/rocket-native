import React from 'react';
import { Button, Animated, Alert, StyleSheet, View, TouchableOpacity, TouchableHighlight, TextInput,Text } from 'react-native';
import {Expo} from 'expo';
import About from '../native/components/About';


export default class Lock extends React.Component {
  constructor(props){
    super(props)
    this.state = {bioButton:false, authLock:false}
  }
  componentWillMount(){
		this._start()
	}

  _start = async () => {
    let result = await this._checkBio();
    if(result){
      this.setState({bioButton:true})
      this._handleScan()
    }
  }

  _checkBio = async () => {
		let result = await Expo.LocalAuthentication.hasHardwareAsync();
    let result2 = await Expo.LocalAuthentication.isEnrolledAsync();
    console.log("result => " + result)
    console.log("result2 => " + result2)
		if (result && result2) {
		  return true;
    }else{
      return false;
    }
	};

  _handleScan = () => {
		if (Expo.Constants.platform.android) {
			this._showAndroidAlert();
		} else {
			this._scanBiometrics();
		}
	};
	
	
	_showAndroidAlert = () => {
		Alert.alert('Fingerprint Scan', 
    'Place your finger over the touch sensor.',
    [{text: 'Use Pin', onPress: () => this._cancelAuthenticate()},]);
		this._scanBiometrics();
	};

  _cancelAuthenticate = () => {
    Expo.LocalAuthentication.cancelAuthenticate()
  }

	_scanBiometrics = async () => {
		let result = await Expo.LocalAuthentication.authenticateAsync('Biometric Scan.');
		if (result.success) {
      this.setState = ({
        authLock: true
      })
		  Alert.alert('authentication success');
		} else {
      if(!result.error.includes("cancel"))
        this.setState = ({
          authLock: false
        })
		    Alert.alert('authentication failed');
		}
	};

	
	render() {
    const { authLock, bioButton} = this.state
    const isAuth = authLock 
    ?
    <Text>True</Text>
    :
    <Text>Failed</Text>
    

		return (
			<View>
        { this.state.bioButton ? 
          <View>
            <Button 
              title="sacn" 
              onPress={() => this._handleScan()}>
            </Button>
          </View> : 
            <Text>Scan Failed</Text>}
          { this.state.authLock }
			</View>
		);
	}
}